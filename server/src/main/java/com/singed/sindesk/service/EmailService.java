package com.singed.sindesk.service;

import com.singed.sindesk.domain.email.EmailRequestDTO;
import com.singed.sindesk.domain.email.EmailVerificationToken;
import com.singed.sindesk.domain.user.User;
import com.singed.sindesk.repository.EmailTokenRepository;
import com.singed.sindesk.service.utils.TokenUtils;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailTokenRepository tokenRepository;

    public void sendEmail(String to, String subject, String body) throws MessagingException, IOException
    {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
    public void sendVerificationEmail(User user)
    {
        SimpleMailMessage message = new SimpleMailMessage();
        String token = TokenUtils.generateVerificationToken();

        LocalDateTime expiresAt = LocalDateTime.now().plusHours(24);

        EmailVerificationToken emailVerificationToken = new EmailVerificationToken(user,token,expiresAt);
        tokenRepository.save(emailVerificationToken);

        String verifyLink = "http://localhost:3000/verify/" + token;
        try{
            this.sendEmail(user.getEmail(),"Link de Verificação",verifyLink);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

}
