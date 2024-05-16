window.onload = function() {
    // Controleer de status van de onderhoudsmodus wanneer de pagina is geladen
    checkMaintenanceMode();

    // Functie om de onderhoudsmodus te controleren
    function checkMaintenanceMode() {
        // Stuur een AJAX-verzoek naar een JSON-bestand dat de status van de onderhoudsmodus bevat
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'maintenance_status.json', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var maintenanceMode = response.maintenance_mode;

                // Als de onderhoudsmodus is ingeschakeld, doorsturen naar de onderhoudspagina
                if (maintenanceMode === true) {
                    window.location.href = 'maintenance';
                }
            }
        };
        xhr.send();
    }
};
