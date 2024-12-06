package com.singed.sindesk.domain.ticket;

import com.singed.sindesk.domain.topic.TopicTags;
import com.singed.sindesk.domain.user.User;

public record TicketRequestDTO(String subject, String description, TicketStatus status, String sender, TopicTags[] tags) {}
