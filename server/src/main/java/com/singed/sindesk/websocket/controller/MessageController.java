package com.singed.sindesk.websocket.controller;

import com.singed.sindesk.websocket.domain.Chatroom;
import com.singed.sindesk.websocket.domain.Message;
import com.singed.sindesk.websocket.service.ChatroomService;
import com.singed.sindesk.websocket.service.MessageService;
import org.apache.logging.log4j.util.InternalException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/ws/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private ChatroomService chatroomService;

    @GetMapping("/{ticketId}")
    public ResponseEntity<List<Message>> getChatMessagesByTicketId(@PathVariable String ticketId)
    {
        List<Message> msgsFromTicketId = null;
        try{
            Chatroom cr = chatroomService.findChatroomByChatroomId(ticketId);
            if(cr!=null)
            {
                msgsFromTicketId = messageService.findChatMessagesByChatroomId(cr.getChatroomId());
            }

        }catch(Exception e)
        {
            e.printStackTrace();
            throw new InternalException(e.getMessage());
        }
        return new ResponseEntity<List<Message>>(msgsFromTicketId,HttpStatus.OK);
    }
    @GetMapping("/{senderId}/{recipientId}")
    public ResponseEntity<List<Message>> getChatMessages(@PathVariable String senderId, @PathVariable String recipientId)
    {
        List<Message> msgsFromSenderRecipient= null;
        try{
            Chatroom cr = chatroomService.findChatroomBySenderIdAndRecipientId(senderId, recipientId);
            if(cr!=null)
            {
                msgsFromSenderRecipient = messageService.findChatMessagesByChatroomId(cr.getChatroomId());
            }

        }catch(Exception e)
        {
            e.printStackTrace();
            throw new InternalException("Cannot find messages between sender"+senderId+"and recipient");

        }
        return new ResponseEntity<List<Message>>(msgsFromSenderRecipient, HttpStatus.OK);
    }


}
