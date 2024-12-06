package com.singed.sindesk.repository;

import com.singed.sindesk.domain.email.EmailVerificationToken;
import com.singed.sindesk.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailTokenRepository extends JpaRepository<EmailVerificationToken,Long> {

    Optional<EmailVerificationToken> findByToken(String token);
}
