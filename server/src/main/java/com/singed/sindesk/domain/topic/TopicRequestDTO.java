package com.singed.sindesk.domain.topic;

import java.util.List;

public record TopicRequestDTO(String title, String description, List<TopicTags> tags) {
}
