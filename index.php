<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ontvang de formuliergegevens
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    
    // Stuur de e-mail
    $to = "rifoneud@gmail.com"; // Vervang dit met jouw e-mailadres
    $subject = "Contactformulier ingevuld";
    $message = "Naam: " . $fullname . "\n" .
               "E-mail: " . $email . "\n" .
               "Bericht: " . $subject;
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    
    // Verstuur de e-mail
    mail($to, $subject, $message, $headers);
    
    // Geef een succesbericht weer
    echo "Bedankt voor je bericht!";
}
?>
