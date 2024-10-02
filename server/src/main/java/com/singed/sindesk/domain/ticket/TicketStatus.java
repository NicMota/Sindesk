package com.singed.sindesk.domain.ticket;

public enum TicketStatus{

    OPEN("open"),
    PENDING("pending"),
    CLOSED("closed");

    private String status;

    TicketStatus(String status)
    {
        this.status = status;
    }
}
