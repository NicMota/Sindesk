package com.singed.sindesk.websocket.service;

import com.singed.sindesk.websocket.domain.Chatroom;
import com.singed.sindesk.websocket.repository.ChatroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatroomService {

    @Autowired
    ChatroomRepository chatroomRepository;
    public Chatroom findChatroomByChatroomId(String chatroomId)
    {
        Optional<Chatroom> found = chatroomRepository.findChatroomByChatroomId(chatroomId);
        if(found.isPresent())
        {
            return found.get();
        }
        return null;
    }
    public Chatroom findChatroomBySenderIdAndRecipientId(String senderId, String recipientId)
    {
        Optional<Chatroom> found = chatroomRepository.findChatroomBySenderIdAndRecipientId(senderId,recipientId);

        if(found.isPresent())
        {
            return found.get();
        }
        return null;
    }
}
