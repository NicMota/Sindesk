package com.singed.sindesk.domain.ticket;

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
    private String status;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @ManyToOne
    @JoinColumn(
            name = "sender_id",
            referencedColumnName = "Id"
    )
    private User sender;

    public Ticket(TicketRequestDTO ticketRequestDTO)
    {
        this.subject = ticketRequestDTO.subject();
        this.description = ticketRequestDTO.description();
        this.status = ticketRequestDTO.status();
    }
    
}
