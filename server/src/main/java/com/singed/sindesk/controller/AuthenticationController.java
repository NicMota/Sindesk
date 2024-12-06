package com.singed.sindesk.controller;

import com.singed.sindesk.domain.user.AuthenticationDTO;
import com.singed.sindesk.domain.user.LoginResponseDTO;
import com.singed.sindesk.domain.user.RegisterDTO;
import com.singed.sindesk.domain.user.User;
import com.singed.sindesk.infra.security.JwtService;
import com.singed.sindesk.repository.UserRepository;

import com.singed.sindesk.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")

public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository repository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private EmailService emailService;
    
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthenticationDTO data)
    {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(),data.password());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = jwtService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data)
    {
        if(this.repository.findByEmail(data.email()) != null) return ResponseEntity.badRequest().build( );

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());

        User newUser =  new User(data.login(),data.email(),encryptedPassword,data.number(),data.role());
        this.repository.save(newUser);
        emailService.sendVerificationEmail(newUser);
        return ResponseEntity.ok().build();
    }

}
