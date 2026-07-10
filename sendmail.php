<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: contact.html");
    exit;
}

function clean_input($value) {
    return trim(str_replace(["\r", "\n"], " ", filter_var($value, FILTER_SANITIZE_SPECIAL_CHARS)));
}

$name = clean_input($_POST["name"] ?? "");
$email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
$phone = clean_input($_POST["phone"] ?? "");
$interest = clean_input($_POST["interest"] ?? "");
$message = trim($_POST["message"] ?? "");
$formType = clean_input($_POST["form_type"] ?? "Contact");

// 🚨 LOGIC NOTE: Agar hello@udyamkart.com tumhara active Hostinger inbox hai, toh yeh bilkul sahi hai.
$to = "hello@udyamkart.com";
$from = "hello@udyamkart.com";
$redirect = strtolower($formType) === "join" ? "join.html" : "contact.html";

if ($name === "" || !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === "") {
    echo "<script>
        alert('Please enter your name, a valid email, and your message.');
        window.location='{$redirect}';
    </script>";
    exit;
}

$subject = "New {$formType} Message - Uydamkart Website";

$body = "You received a new message from the Uydamkart website.\n\n";
$body .= "Name: {$name}\n";
$body .= "Email: {$email}\n";

if ($phone !== "") {
    $body .= "Phone: {$phone}\n";
}

if ($interest !== "") {
    $body .= "Interest: {$interest}\n";
}

$body .= "\nMessage:\n{$message}\n";

$headers = [
    "From: Uydamkart Website <{$from}>",
    "Reply-To: {$name} <{$email}>",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "X-Mailer: PHP/" . phpversion()
];

// 🛠️ FIX: Niche se "-f {$from}" wala logic remove kar diya hai taaki Hostinger block na kare
$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo "<script>
        alert('Message sent successfully! We will contact you shortly.');
        window.location='{$redirect}';
    </script>";
} else {
    echo "<script>
        alert('Message could not be sent. Please email us directly at hello@udyamkart.com.');
        window.location='{$redirect}';
    </script>";
}
?>