<?php
/**
 * Tide Pools: quote form mailer (Bluehost / any PHP host).
 *
 * Used when SITE.contact.provider = "php" in js/site-data.js.
 * Receives the form as a POST, validates it and emails it with PHP mail().
 * Always responds with JSON: { "ok": true } or { "ok": false, "error": "..." }.
 *
 * Setup: see README.md → "Production on Bluehost". Set FROM_EMAIL to a real
 * mailbox on the tidepoolsllc.com domain (e.g. created in Bluehost → Email),
 * otherwise messages may land in spam.
 */
declare(strict_types=1);

const TO_EMAIL = 'Swim@tidepoolsllc.com';
const FROM_EMAIL = 'website@tidepoolsllc.com';
const FROM_NAME = 'Tide Pools Website';
const SUBJECT = 'New quote request from tidepoolsllc.com';
const RATE_LIMIT_SECONDS = 60;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

/** Send a JSON response and stop. Messages are fixed strings: raw input is never echoed. */
function respond(int $status, bool $ok, string $error = ''): void
{
    http_response_code($status);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

/** Read a POST field as trimmed text: control characters stripped, length capped. */
function field(string $key, int $max = 500): string
{
    $value = $_POST[$key] ?? '';
    if (!is_string($value)) {
        return '';
    }
    $value = preg_replace('/[^\P{C}\n\t]/u', '', $value) ?? ''; // drop control chars except newline/tab
    return mb_substr(trim($value), 0, $max);
}

/** Collapse to a single line (defends against header injection). */
function one_line(string $value): string
{
    return trim((string) preg_replace('/\s+/u', ' ', $value));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

// Honeypot: humans never fill this hidden field.
if (field('company_website') !== '') {
    respond(400, false, 'Your request could not be sent.');
}

$first   = one_line(field('first_name', 80));
$last    = one_line(field('last_name', 80));
$email   = one_line(field('email', 254));
$phone   = one_line(field('phone', 40));
$address = one_line(field('address', 200));
$service = one_line(field('service', 100));
$message = field('message', 3000);

if ($first === '' || $last === '') {
    respond(422, false, 'Please fill in your first and last name.');
}
$email = filter_var($email, FILTER_VALIDATE_EMAIL);
if ($email === false) {
    respond(422, false, 'Please enter a valid email address.');
}
if ($phone !== '' && !preg_match('/^[\d\s()+.\-]{7,25}$/', $phone)) {
    respond(422, false, 'Please enter a valid phone number, or leave it blank.');
}

// Rate limit: one submission per IP per RATE_LIMIT_SECONDS (timestamp file in the temp dir).
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$stamp = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'tidepools_rl_' . hash('sha256', $ip);
$last_sent = is_file($stamp) ? (int) @file_get_contents($stamp) : 0;
if ($last_sent > 0 && (time() - $last_sent) < RATE_LIMIT_SECONDS) {
    respond(429, false, 'Please wait a minute before sending another request.');
}

$lines = [
    'New quote request from the website',
    '',
    'Name:     ' . $first . ' ' . $last,
    'Email:    ' . $email,
    'Phone:    ' . ($phone !== '' ? $phone : '-'),
    'Address:  ' . ($address !== '' ? $address : '-'),
    'Service:  ' . ($service !== '' ? $service : '-'),
    '',
    'Message:',
    $message !== '' ? $message : '-',
    '',
    '--',
    'Sent ' . date('Y-m-d H:i T') . ' from ' . ($_SERVER['HTTP_HOST'] ?? 'tidepoolsllc.com'),
];
$body = implode("\r\n", $lines);

$headers = implode("\r\n", [
    'From: ' . mb_encode_mimeheader(FROM_NAME, 'UTF-8') . ' <' . FROM_EMAIL . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
]);
$subject = mb_encode_mimeheader(SUBJECT . ' (' . $first . ' ' . $last . ')', 'UTF-8');

$sent = mail(TO_EMAIL, $subject, $body, $headers, '-f' . FROM_EMAIL);
if (!$sent) {
    respond(500, false, 'We could not send your request right now. Please call us instead.');
}

@file_put_contents($stamp, (string) time(), LOCK_EX);
respond(200, true);
