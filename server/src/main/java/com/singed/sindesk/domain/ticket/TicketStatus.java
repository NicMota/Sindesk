package com.singed.sindesk.domain.ticket;

public enum TicketStatus{

    ABERTO("aberto"),
    PENDENTE("pendente"),
    FECHADO("fechado");

    private String status;

    TicketStatus(String status)
    {
        this.status = status;
    }
}
