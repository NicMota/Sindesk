package com.singed.sindesk.repository;
import com.singed.sindesk.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket,Integer>{

}
