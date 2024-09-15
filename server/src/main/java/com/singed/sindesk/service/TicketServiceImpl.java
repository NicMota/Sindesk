package com.singed.sindesk.service;

import com.singed.sindesk.model.Ticket;
import com.singed.sindesk.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketServiceImpl implements TicketService{

    @Autowired
    private TicketRepository ticketRepository;
    @Override
    public Ticket save(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @Override
    public List<Ticket> findAll() {
        return ticketRepository.findAll();
    }

    @Override
    public Optional<Ticket> findById(int id) {
        return ticketRepository.findById(id);
    }

    @Override
    public Ticket update(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @Override
    public void deleteById(int id) {
        ticketRepository.deleteById(id);
    }
}
