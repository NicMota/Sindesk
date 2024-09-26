package com.singed.sindesk.repository;

import com.singed.sindesk.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserRepository extends JpaRepository<User,Long> {
    UserDetails findByEmail(String email);

    UserDetails findByLogin(String login);
}
