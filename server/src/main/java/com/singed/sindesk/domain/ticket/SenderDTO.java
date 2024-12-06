package com.singed.sindesk.domain.ticket;

import com.singed.sindesk.domain.user.User;

public record SenderDTO (String id,String email, String login, String number){
    public SenderDTO(User user)
    {
        this(user.getId(),user.getEmail(),user.getLogin(),user.getNumber());
    }
}
