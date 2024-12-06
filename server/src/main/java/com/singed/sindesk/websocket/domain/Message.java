package com.singed.sindesk.websocket.domain;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int messageId;
    private String chatroomId;
    private String ticketId;
    private String content;
    private String senderId;
    private String recipientId;
    private String senderName;
    private String recipientName;

    private String createdOn;
    private String status;
}
