package com.singed.sindesk.domain.ticket;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.singed.sindesk.domain.topic.TopicTags;
import com.singed.sindesk.domain.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.validation.annotation.Validated;

import java.util.Date;


@Entity(name="tickets")
@Table(name="tickets")
@EqualsAndHashCode(of="id")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Validated
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String subject;
    private String description;

    @Enumerated(EnumType.STRING)
    private TicketStatus status = TicketStatus.ABERTO;
    
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="sender_id")
    @JsonBackReference
    private User sender;

    private TopicTags[] tags;

    public Ticket(TicketRequestDTO ticketRequestDTO)
    {
        this.subject = ticketRequestDTO.subject();
        this.description = ticketRequestDTO.description();
        this.tags = ticketRequestDTO.tags();
    }
    public Ticket(TicketRequestDTO ticketRequestDTO, User sender)
    {
        this.subject = ticketRequestDTO.subject();
        this.description = ticketRequestDTO.description();
        this.tags = ticketRequestDTO.tags();
        this.sender = sender;
    }
    
}
