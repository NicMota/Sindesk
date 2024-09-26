package com.singed.sindesk.domain.user;

public record RegisterDTO(String login, String email,String password,String number, UserRole role) {}
