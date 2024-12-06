package com.singed.sindesk.websocket.repository;

import com.singed.sindesk.websocket.domain.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ChatroomRepository extends JpaRepository<Chatroom,Integer> {

    @Query("FROM Chatroom c WHERE c.senderId = :senderId AND c.recipientId = :recipientId")
    Optional<Chatroom> findChatroomBySenderIdAndRecipientId(String senderId, String recipientId);

    @Query("FROM Chatroom c WHERE c.chatroomId = :chatroomId")
    Optional<Chatroom> findChatroomByChatroomId(String chatroomId);
}
