package com.singed.sindesk.domain.email;

import com.singed.sindesk.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmailVerificationToken {
    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    private User user;

    private String token;
    private LocalDateTime expiresAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt =  LocalDateTime.now();
    public EmailVerificationToken(User user,String token,LocalDateTime expiresAt)
    {
        this.user = user;
        this.token = token;
        this.expiresAt = expiresAt;
    }
}
