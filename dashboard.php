<?php
// Controleer of de gebruiker is ingelogd
session_start();
if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit();
}

// Controleer of het formulier is ingediend
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['maintenance_mode'])) {
        // Schakel onderhoudsmodus in of uit
        $maintenance_mode = $_POST['maintenance_mode'] === 'on' ? true : false;
        file_put_contents('maintenance_mode.txt', $maintenance_mode ? 'on' : 'off');
    }
}
?>

<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
</head>
<body>
    <h1>Dashboard</h1>
    
    <!-- Formulier om onderhoudsmodus in- of uit te schakelen -->
    <form method="post">
        <label>
            <input type="checkbox" name="maintenance_mode" <?php echo file_get_contents('maintenance_mode.txt') === 'on' ? 'checked' : ''; ?>>
            Onderhoudsmodus
        </label>
        <button type="submit">Opslaan</button>
    </form>
</body>
</html>
