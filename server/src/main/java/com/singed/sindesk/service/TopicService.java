package com.singed.sindesk.service;

import com.singed.sindesk.domain.topic.Topic;
import com.singed.sindesk.domain.topic.TopicTags;
import com.singed.sindesk.repository.TopicRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {
    @Autowired
    TopicRepository topicRepository;


    @Transactional
    public List<Topic> getTopicsByTags(List<TopicTags> tags )
    {
        return topicRepository.findAllByTagsIn(tags);
    }
}
