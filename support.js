// Simulated database of tickets
let tickets = [];

// Function to create a new ticket
function createTicket(subject, description) {
    let ticket = {
        id: tickets.length + 1,
        subject: subject,
        description: description,
        status: 'Open',
        responses: []
    };
    tickets.push(ticket);
    return ticket;
}

// Function to close a ticket
function closeTicket(ticketId) {
    for (let ticket of tickets) {
        if (ticket.id === ticketId) {
            ticket.status = 'Closed';
            return true;
        }
    }
    return false;
}

// Function to reopen a ticket
function reopenTicket(ticketId) {
    for (let ticket of tickets) {
        if (ticket.id === ticketId) {
            ticket.status = 'Open';
            return true;
        }
    }
    return false;
}

// Function to add a response to a ticket
function addResponse(ticketId, response) {
    for (let ticket of tickets) {
        if (ticket.id === ticketId) {
            ticket.responses.push(response);
            return true;
        }
    }
    return false;
}

// Function to display user's tickets
function displayUserTickets() {
    let userTicketsDiv = document.getElementById('userTickets');
    userTicketsDiv.innerHTML = '';
    for (let ticket of tickets) {
        userTicketsDiv.innerHTML += `<div class="ticket">
            <h3>${ticket.subject}</h3>
            <p><strong>Status:</strong> ${ticket.status}</p>
            <p><strong>Beschrijving:</strong> ${ticket.description}</p>
            <button onclick="editTicket(${ticket.id})">Bewerk</button>
        </div>`;
    }
}

// Function to display admin panel
function displayAdminPanel() {
    let adminPanelDiv = document.getElementById('adminPanel');
    adminPanelDiv.innerHTML = '<h2>Admin Paneel</h2>';
    for (let ticket of tickets) {
        adminPanelDiv.innerHTML += `<div class="ticket">
            <h3>${ticket.subject}</h3>
            <p><strong>Status:</strong> ${ticket.status}</p>
            <p><strong>Beschrijving:</strong> ${ticket.description}</p>
            <button onclick="closeTicket(${ticket.id})">Sluiten</button>
            <button onclick="reopenTicket(${ticket.id})">Heropenen</button>
            <textarea id="response${ticket.id}" placeholder="Antwoord" required></textarea>
            <button onclick="addResponse(${ticket.id})">Reageren</button>
        </div>`;
    }
}

// Function to handle form submission
document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let subject = document.getElementById('subject').value;
    let description = document.getElementById('description').value;
    let newTicket = createTicket(subject, description);
    displayUserTickets();
    document.getElementById('ticketForm').reset();
});

// Initial display of user's tickets and admin panel
displayUserTickets();
displayAdminPanel();
