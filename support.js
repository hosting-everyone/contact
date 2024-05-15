let tickets = [];

function createTicket(subject, description) {
    let ticket = {
        id: tickets.length + 1,
        subject: subject,
        description: description,
        status: 'Open'
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

function displayTickets() {
    let ticketsDiv = document.getElementById('tickets');
    ticketsDiv.innerHTML = '';
    for (let ticket of tickets) {
        let ticketStatus = ticket.status === 'Open' ? 'Open' : 'Gesloten';
        ticketsDiv.innerHTML += `<div>Ticket ID: ${ticket.id}, Onderwerp: ${ticket.subject}, Beschrijving: ${ticket.description}, Status: ${ticketStatus}</div>`;
    }
}

document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let subject = document.getElementById('subject').value;
    let description = document.getElementById('description').value;
    let newTicket = createTicket(subject, description);
    displayTickets();
    document.getElementById('ticketForm').reset();
});

// Voorbeeld: ticket sluiten na 5 seconden
setTimeout(function() {
    closeTicket(1);
    displayTickets();
}, 5000);
