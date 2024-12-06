package com.singed.sindesk.repository;

import com.singed.sindesk.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,String> {

    List<User> findAll();

    UserDetails findByEmail(String email);

    UserDetails findByLogin(String login);

    Optional<User> findById(String id);
}
