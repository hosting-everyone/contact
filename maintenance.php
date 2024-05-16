<?php
// Controleer of onderhoudsmodus is ingeschakeld
if (file_get_contents('maintenance_mode.txt') === 'on') {
    header('Location: maintenance_page.php');
    exit();
}
?>
