package com.singed.sindesk.domain.ticket;



public record TicketResponseDTO (String subject, String description, String status) {
    public TicketResponseDTO(Ticket ticket) {
        this(ticket.getSubject(), ticket.getDescription(), ticket.getStatus());
    }
}