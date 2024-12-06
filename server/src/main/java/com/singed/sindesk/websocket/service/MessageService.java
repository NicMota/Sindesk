package com.singed.sindesk.websocket.service;

import com.singed.sindesk.websocket.domain.Message;
import com.singed.sindesk.websocket.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    MessageRepository messageRepository;

    public List<Message> findChatMessagesFromSelectedUser(String senderId, String recipientId)
    {
        return messageRepository.findChatMessagesFromSelectedUser(senderId, recipientId);
    }
    public List<Message> findChatMessagesByChatroomId(String chatroomId)
    {
        return messageRepository.findChatMessagesByChatroomId(chatroomId);
    }
}
