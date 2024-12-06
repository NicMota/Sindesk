package com.singed.sindesk.websocket.controller;

import com.singed.sindesk.service.utils.MapperUtils;
import com.singed.sindesk.websocket.config.WebSocketEventListener;
import com.singed.sindesk.websocket.domain.Message;
import com.singed.sindesk.websocket.domain.Chatroom;
import com.singed.sindesk.websocket.domain.MessageDTO;
import com.singed.sindesk.websocket.repository.ChatroomRepository;
import com.singed.sindesk.websocket.repository.MessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.logging.log4j.util.InternalException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Slf4j
@Controller
public class ChatController{

    @Autowired
    WebSocketEventListener auth;

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private ChatroomRepository chatroomRepository;

    @Autowired
    private MessageRepository messageRepository;

    @MessageMapping("/chat.sendMessage")
    public void sendMessageByTicketId(Message message, SimpMessageHeaderAccessor headerAccessor)
    {
        String sessionId = headerAccessor.getSessionId();
        Optional<Chatroom> chatroom = chatroomRepository.findChatroomByChatroomId(message.getTicketId());

        String chatroomId = "";
        if(chatroom.isEmpty())
        {
            chatroomId = message.getTicketId();

            Chatroom ticketCr = Chatroom.builder()
                    .chatroomId(message.getTicketId())
                    .recipientId(message.getRecipientId())
                    .senderId(message.getSenderId())
                    .build();

            try{
                chatroomRepository.save(ticketCr);
            }catch(Exception e)
            {
                e.printStackTrace();
                throw new InternalException(e.getMessage());
            }
        }else {
            chatroomId = chatroom.get().getChatroomId();
        }
        message.setChatroomId(chatroomId);
        Message saved = null;
        try{
           saved = messageRepository.save(message);
        }catch (Exception e)
        {
            throw new InternalException(e.getMessage());
        }
        MessageDTO mes = MapperUtils.mapperObject(saved,MessageDTO.class);
        log.info("Sending message to " + message.getTicketId() + " chatroom");
        messagingTemplate.convertAndSendToUser(message.getTicketId(),"/queue/messages",mes);
    }
    @MessageMapping("/chat")
    public void sendMessage(Message message, SimpMessageHeaderAccessor headerAccessor)
    {
        String sessionId = headerAccessor.getSessionId();

        Optional<Chatroom> chatroom = chatroomRepository.findChatroomBySenderIdAndRecipientId(message.getSenderId(), message.getRecipientId());
        String chatroomId = "";
        if(chatroom.isEmpty()){
            chatroomId = String.format("%s_%s", message.getSenderId(), message.getRecipientId());

            Chatroom senderRecipient = Chatroom
                    .builder()
                    .chatroomId(chatroomId)
                    .senderId(message.getSenderId())
                    .recipientId(message.getRecipientId())
                    .build();

            Chatroom recipientSender = Chatroom
                    .builder()
                    .chatroomId(chatroomId)
                    .senderId(message.getRecipientId())
                    .recipientId(message.getSenderId())
                    .build();
            try{
                chatroomRepository.save(senderRecipient);
                chatroomRepository.save(recipientSender);
            }
            catch(Exception ex){
                ex.printStackTrace();
                throw new InternalException("Cannot create new chat room between sender "+ message.getSenderId()+" and recipient "+ message.getRecipientId());
            }
        }else{
            chatroomId = chatroom.get().getChatroomId();
        }
        message.setChatroomId(chatroomId);
        Message saved = null;
        try{
            saved = messageRepository.save(message);
        }catch (Exception ex)
        {
            throw new InternalException("Cannot create new Message in ChatroomId: "+ chatroomId);
        }

        MessageDTO mes = MapperUtils.mapperObject(saved, MessageDTO.class);
        log.info("enviando mensagem para" + saved.getRecipientName());
        messagingTemplate.convertAndSendToUser(message.getRecipientName(),"/queue/messages",mes);
    }


}
