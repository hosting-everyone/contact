const params = new URLSearchParams(window.location.search);
const code = params.get('code');

if (code) {
    const clientId = '1240374594242609293';
    const redirectUri = 'https://ricardo-s-website.netlify.app/';

    const tokenUrl = `https://discord.com/api/oauth2/token?client_id=${clientId}&grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=identify%20guilds`;

    fetch(tokenUrl, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Token response:', data);
        // Voeg hier je controle toe of de gebruiker in je Discord-server zit
        // Als de gebruiker in je server zit, gebruik dan window.location.href om ze door te sturen naar authorized.html
        // Als de gebruiker niet in je server zit, toon dan een foutmelding
    })
    .catch(error => {
        console.error('Fout bij het ophalen van het toegangstoken:', error);
        // Toon een foutmelding aan de gebruiker
    });
} else {
    console.error('Geen autorisatiecode ontvangen.');
    // Toon een foutmelding aan de gebruiker omdat er geen autorisatiecode is
}
