<?php
session_start();

// Controleer of de gebruiker al is ingelogd
if (isset($_SESSION['username'])) {
    header('Location: dashboard.php');
    exit();
}

// Controleer of het formulier is ingediend
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Controleer gebruikersnaam en wachtwoord (voorbeeld: admin/admin)
    if ($_POST['username'] === 'admin' && $_POST['password'] === 'admin') {
        // Gebruikersnaam en wachtwoord zijn correct, sla de sessie op en stuur door naar dashboard
        $_SESSION['username'] = $_POST['username'];
        header('Location: dashboard.php');
        exit();
    } else {
        // Onjuiste gebruikersnaam of wachtwoord, toon een foutmelding
        $error_message = 'Ongeldige gebruikersnaam of wachtwoord';
    }
}
?>

<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h1>Login</h1>
    <?php if (isset($error_message)) : ?>
        <p><?php echo $error_message; ?></p>
    <?php endif; ?>
    <form method="post">
        <label>
            Gebruikersnaam: <input type="text" name="username" required>
        </label><br>
        <label>
            Wachtwoord: <input type="password" name="password" required>
        </label><br>
        <button type="submit">Login</button>
    </form>
</body>
</html>
