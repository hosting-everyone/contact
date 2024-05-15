const express = require('express');
const app = express();
const Discord = require('discord.js');

const client = new Discord.Client();
const yourGuildId = '1240329189052252180';

// Discord OAuth gegevens
const clientId = '1240374594242609293';
const clientSecret = 'wO0tYRMvWBU6jdd2JaNI4KrBwtPNovrF';
const redirectUri = 'https://ricardo-s-website.netlify.app/';
const scopes = ['identify', 'guilds'];

// Discord login link
const discordLoginLink = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scopes.join(' '))}`;

// Express route voor OAuth redirect URI
app.get('/oauth/redirect', async (req, res) => {
    try {
        const code = req.query.code;
        const token = await getToken(code);
        
        const user = await getUser(token.access_token);
        
        // Controleer of de gebruiker in jouw server zit
        const guild = await client.guilds.fetch(yourGuildId);
        const member = await guild.members.fetch(user.id);
        
        if (member) {
            // Gebruiker zit in jouw server, doorstuur naar de homepagina
            res.redirect('/');
        } else {
            // Gebruiker zit niet in jouw server, toon een foutmelding
            res.send('Om toegang te krijgen, moet je in onze Discord server zitten.');
        }
    } catch (error) {
        console.error('Fout bij OAuth redirect:', error);
        res.status(500).send('Er is een fout opgetreden bij het verwerken van de aanvraag.');
    }
});

// Functie om de toegangstoken te krijgen met de verstrekte autorisatiecode
async function getToken(code) {
    const params = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        scope: scopes.join(' ')
    });

    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    });

    return await response.json();
}

// Functie om gebruikersgegevens op te halen met behulp van de verstrekte toegangstoken
async function getUser(accessToken) {
    const response = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    });

    return await response.json();
}

// Start de express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is gestart op poort ${PORT}`);
});

// Log de bot in
client.login('MTI0MDM3NDU5NDI0MjYwOTI5Mw.G1itMm.E_vPDSiVe-pqhkZS4A089aBARVU_XJFDPXihzc');
