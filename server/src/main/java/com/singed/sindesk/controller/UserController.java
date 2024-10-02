package com.singed.sindesk.controller;


import com.singed.sindesk.domain.ticket.Ticket;
import com.singed.sindesk.domain.ticket.TicketResponseDTO;
import com.singed.sindesk.domain.user.User;
import com.singed.sindesk.repository.UserRepository;
import com.singed.sindesk.service.TicketService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {


    @Autowired
    UserRepository userRepository;

    @Autowired
    TicketService ticketService;
    @GetMapping("/tickets/{id}")
    public ResponseEntity<List<TicketResponseDTO>> getUserTickets(@PathVariable("id") String id)
    {
        User user = (User) userRepository.findById(id);
        List<TicketResponseDTO> ticketsList = ticketService.getTicketsByUser(user).stream().map(TicketResponseDTO::new).toList();
        return ResponseEntity.status(HttpStatus.OK).body(ticketsList);
    }

}
