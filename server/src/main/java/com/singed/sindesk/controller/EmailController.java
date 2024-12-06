package com.singed.sindesk.controller;

import com.singed.sindesk.domain.email.EmailRequestDTO;
import com.singed.sindesk.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    EmailService emailService;


    @PostMapping
    public ResponseEntity<String> sendEmail(@RequestBody  EmailRequestDTO email)
    {
        try{
            emailService.sendEmail(email.to(),email.subject(), email.body());
        }catch (Exception e)
        {
           e.printStackTrace();
           log.info(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
