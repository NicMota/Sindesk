package com.singed.sindesk.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String subject;
    private String desc;
    private String status;
    
}
