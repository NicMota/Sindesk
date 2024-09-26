package com.singed.sindesk.controller;

import com.singed.sindesk.domain.ticket.Ticket;
import com.singed.sindesk.domain.ticket.TicketRequestDTO;
import com.singed.sindesk.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("api/ticket")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @GetMapping
    public ResponseEntity<List<Ticket>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(ticketService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Ticket>> findById(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(ticketService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Ticket> create(@RequestBody TicketRequestDTO ticket){
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.save(new Ticket(ticket)));
    }

    @PutMapping
    public ResponseEntity<Ticket> update(@RequestBody TicketRequestDTO ticket) {
        return ResponseEntity.status(HttpStatus.OK).body(ticketService.update(new Ticket(ticket)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id)
    {
        ticketService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
