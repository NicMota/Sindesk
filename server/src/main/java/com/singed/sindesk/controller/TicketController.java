package com.singed.sindesk.controller;

import com.singed.sindesk.domain.ticket.Ticket;
import com.singed.sindesk.domain.ticket.TicketRequestDTO;
import com.singed.sindesk.domain.ticket.TicketResponseDTO;
import com.singed.sindesk.domain.ticket.TicketStatus;
import com.singed.sindesk.domain.user.User;
import com.singed.sindesk.repository.UserRepository;
import com.singed.sindesk.service.EmailService;
import com.singed.sindesk.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/ticket")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;
    @GetMapping
    public ResponseEntity<List<TicketResponseDTO>> findAll() {
        List<TicketResponseDTO> ticketsList = ticketService.findAll().stream().map(TicketResponseDTO::new).toList();
        return ResponseEntity.status(HttpStatus.OK).body(ticketsList);
    }

//    @GetMapping("/status/{status}")
//    public ResponseEntity<List<TicketResponseDTO>> findTicketsByStatus(@PathVariable TicketStatus status){
//        List<TicketResponseDTO> ticketsList = ticketService.getTicketsByStatus(status).stream().map(TicketResponseDTO::new).toList();
//        return ResponseEntity.status(HttpStatus.OK).body(ticketsList);
//    }

    @GetMapping("/count/{status}")
    public ResponseEntity<Long> countTicketsByStatus(@PathVariable TicketStatus status)
    {
        Long count = ticketService.getTicketsCountByStatus(status);
        return ResponseEntity.status(HttpStatus.OK).body(count);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponseDTO> findById(@PathVariable int id) {
        Optional<Ticket> ticketOptional = ticketService.findById(id);

        // Check if ticket is present, then map it to TicketResponseDTO
        return ticketOptional
                .map(ticket -> ResponseEntity.status(HttpStatus.OK).body(new TicketResponseDTO(ticket)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Ticket> create(@RequestBody TicketRequestDTO ticket){
        Optional<User> sender = userRepository.findById(ticket.sender());
        if(sender.isPresent())
            return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.save(new Ticket(ticket,sender.get())));
        return null;
    }


    @PutMapping
    public ResponseEntity<Ticket> update(@RequestBody Ticket ticket) {
        try {
            Ticket tic = ticketService.update(ticket);
            if(tic != null)
            {
                emailService.sendEmail(ticket.getSender().getEmail(),"Status Atualizado!","O Status do seu ticket foi atualizado");
                return ResponseEntity.status(HttpStatus.OK).body(tic);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

        } catch (Exception e) {
            // Log da exceção
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id)
    {
        ticketService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
