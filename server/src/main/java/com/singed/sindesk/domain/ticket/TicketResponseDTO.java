package com.singed.sindesk.domain.ticket;


import com.singed.sindesk.domain.user.User;

import java.util.Date;

public record TicketResponseDTO (int id, String subject, String description, TicketStatus status, Date createdAt, User sender) {
    public TicketResponseDTO(Ticket ticket) {
        this(ticket.getId(),ticket.getSubject(), ticket.getDescription(), ticket.getStatus(),ticket.getCreatedAt(),ticket.getSender());
    }
}