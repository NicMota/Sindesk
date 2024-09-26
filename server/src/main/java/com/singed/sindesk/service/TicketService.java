package com.singed.sindesk.service;
import com.singed.sindesk.domain.ticket.Ticket;

import java.util.List;
import java.util.Optional;

public interface TicketService {
    Ticket save(Ticket ticket);

    List<Ticket> findAll();

    Optional<Ticket> findById(int id);

    Ticket update(Ticket ticket);

    void deleteById(int id);
}
