package com.singed.sindesk.repository;

import com.singed.sindesk.domain.topic.Topic;
import com.singed.sindesk.domain.topic.TopicTags;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TopicRepository extends JpaRepository<Topic, String> {
    List<Topic> findAllByTagsIn(List<TopicTags> tags);
}
