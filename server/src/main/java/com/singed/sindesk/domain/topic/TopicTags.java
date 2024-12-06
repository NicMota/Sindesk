package com.singed.sindesk.domain.topic;

public enum TopicTags {

    TECHNOLOGY("tecnologia"),
    INTERNET("internet"),
    ONLINE_SHOPPING("compras online");

    private String tag;

    TopicTags(String tag)
    {
        this.tag = tag;
    }
}
