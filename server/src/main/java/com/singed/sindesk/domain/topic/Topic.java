package com.singed.sindesk.domain.topic;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.w3c.dom.Text;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name="topics")
@Table(name="topics")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String Id;
    private String title;


    @Column(columnDefinition="TEXT")
    private String description;
    private LocalDateTime createdAt = LocalDateTime.now();

    private List<TopicTags> tags;

    public Topic(TopicRequestDTO topicDTO)
    {
        this.title = topicDTO.title();
        this.description = topicDTO.description();
        this.tags = topicDTO.tags();
    }

}
