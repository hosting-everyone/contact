let tickets = [];

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

function closeTicket(ticketId) {
    for (let ticket of tickets) {
        if (ticket.id === ticketId) {
            ticket.status = 'Closed';
            return true;
        }
    }
    return false;
}

function addResponse(ticketId, response) {
    for (let ticket of tickets) {
        if (ticket.id === ticketId) {
            ticket.responses.push(response);
            return true;
        }
    }
    return false;
}

function displayTickets() {
    let ticketsDiv = document.getElementById('tickets');
    ticketsDiv.innerHTML = '';
    for (let ticket of tickets) {
        let ticketStatus = ticket.status === 'Open' ? 'Open' : 'Gesloten';
        ticketsDiv.innerHTML += `<div>Ticket ID: ${ticket.id}, Onderwerp: ${ticket.subject}, Beschrijving: ${ticket.description}, Status: ${ticketStatus}</div>`;
    }
}

function displayOpenTickets() {
    let openTicketsSelect = document.getElementById('openTickets');
    openTicketsSelect.innerHTML = '<option value="">Kies een ticket</option>';
    for (let ticket of tickets) {
        if (ticket.status === 'Open') {
            openTicketsSelect.innerHTML += `<option value="${ticket.id}">Ticket ID: ${ticket.id}, Onderwerp: ${ticket.subject}</option>`;
        }
    }
}

document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let subject = document.getElementById('subject').value;
    let description = document.getElementById('description').value;
    let newTicket = createTicket(subject, description);
    displayTickets();
    displayOpenTickets();
    document.getElementById('ticketForm').reset();
});

document.getElementById('closeTicketBtn').addEventListener('click', function() {
    let ticketId = document.getElementById('openTickets').value;
    let response = document.getElementById('adminResponse').value;
    if (ticketId && response) {
        closeTicket(ticketId);
        addResponse(ticketId, response);
        displayTickets();
        displayOpenTickets();
        document.getElementById('adminResponse').value = '';
    } else {
        alert('Kies een ticket en voer een antwoord in.');
    }
});

// Voorbeeld: ticket sluiten na 5 seconden
setTimeout(function() {
    closeTicket(1);
    addResponse(1, 'Dit probleem is opgelost.');
    displayTickets();
    displayOpenTickets();
}, 5000);
