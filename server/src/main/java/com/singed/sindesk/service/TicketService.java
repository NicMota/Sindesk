package com.singed.sindesk.service;
import com.singed.sindesk.domain.ticket.Ticket;
import com.singed.sindesk.domain.ticket.TicketStatus;
import com.singed.sindesk.domain.user.User;

import java.util.List;
import java.util.Optional;

public interface TicketService {
    Ticket save(Ticket ticket);

    List<Ticket> findAll();

    //List<Ticket> getTicketsByStatus(TicketStatus status);

    long getTicketsCountByStatus(TicketStatus status);

    Optional<Ticket> findById(int id);


    Ticket update(Ticket ticket);

    void deleteById(int id);

    List<Ticket> getTicketsByUser(User user);
}
