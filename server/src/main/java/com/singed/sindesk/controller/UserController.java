package com.singed.sindesk.controller;


import com.singed.sindesk.domain.email.EmailVerificationToken;
import com.singed.sindesk.domain.ticket.Ticket;
import com.singed.sindesk.domain.ticket.TicketResponseDTO;
import com.singed.sindesk.domain.user.User;
import com.singed.sindesk.repository.EmailTokenRepository;
import com.singed.sindesk.repository.UserRepository;
import com.singed.sindesk.service.TicketService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {


    @Autowired
    UserRepository userRepository;

    @Autowired
    TicketService ticketService;

    @Autowired
    EmailTokenRepository tokenRepository;

    @GetMapping
    public ResponseEntity<List<User>> findAll(){
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable String id)
    {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent())
            return ResponseEntity.status(HttpStatus.OK).body(user.get());
        return null;
    }

    
    @GetMapping("/tickets/{id}")
    public ResponseEntity<List<TicketResponseDTO>> getUserTickets(@PathVariable("id") String id)
    {
        Optional<User> userOpt = userRepository.findById(id);
        if(userOpt.isPresent())
        {
            List<TicketResponseDTO> ticketsList = ticketService.getTicketsByUser(userOpt.get()).stream().map(TicketResponseDTO::new).toList();
            return ResponseEntity.status(HttpStatus.OK).body(ticketsList);
        }
        return null;
    }

    @PostMapping("/verify")
    public ResponseEntity verifyEmail(@RequestBody String token)
    {
        Optional<EmailVerificationToken> tkn = tokenRepository.findByToken(token);

        if(tkn.isPresent())
        {
            if(tkn.get().getExpiresAt().isBefore(LocalDateTime.now()))
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

            User user = tkn.get().getUser();
            user.setVerified(true);
            userRepository.save(user);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

    }

}
