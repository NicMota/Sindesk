package com.singed.sindesk.controller;

import com.singed.sindesk.domain.ticket.Ticket;
import com.singed.sindesk.domain.topic.Topic;
import com.singed.sindesk.domain.topic.TopicRequestDTO;
import com.singed.sindesk.domain.topic.TopicTags;
import com.singed.sindesk.repository.TopicRepository;
import com.singed.sindesk.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/topic")
public class TopicController {

    @Autowired
    TopicRepository topicRepository;
    @Autowired
    TopicService topicService;
    @GetMapping
    public ResponseEntity<List<Topic>> getAll()
    {
        List<Topic> topics = topicRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(topics);
    }
    @PostMapping
    public ResponseEntity<Topic> save(@RequestBody TopicRequestDTO topicDTO)
    {

        Topic saved = new Topic(topicDTO);

        return ResponseEntity.status(HttpStatus.OK).body(topicRepository.save(saved));

    }

    @GetMapping("/tags/{tags}")
    public ResponseEntity<List<Topic>> findAllByTagsIn(@PathVariable String tags)
    {
        // Split the tags string by comma and convert to List<TopicTags>
        List<TopicTags> tagList = Arrays.stream(tags.split(","))
                .map(String::trim) // Trim whitespace
                .map(TopicTags::valueOf) // Convert to TopicTags enum
                .collect(Collectors.toList());

        // Fetch the topics by tags
        List<Topic> topics = topicService.getTopicsByTags(tagList);
        return ResponseEntity.status(HttpStatus.OK).body(topics);
    }
    @GetMapping("/title/{title}")
    public ResponseEntity<List<Topic>> findAllByTitle(@PathVariable String title)
    {
        List<Topic> topicsList = new ArrayList<>();
        for(Topic topic: topicRepository.findAll())
        {
            if(topic.getTitle().contains(title))
            {
                topicsList.add(topic);
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body(topicsList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Topic>> findById(@PathVariable String id)
    {
        Optional<Topic> topic = topicRepository.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(topic);
    }
}
