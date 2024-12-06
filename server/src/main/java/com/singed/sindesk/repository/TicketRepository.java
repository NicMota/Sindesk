package com.singed.sindesk.repository;
import com.singed.sindesk.domain.ticket.Ticket;
import com.singed.sindesk.domain.ticket.TicketStatus;
import com.singed.sindesk.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket,Integer>{
    List<Ticket> findBySender(User sender);
    /*List<Ticket> findAllByStatus(TicketStatus status);*/
    long countByStatus(TicketStatus status);
}
