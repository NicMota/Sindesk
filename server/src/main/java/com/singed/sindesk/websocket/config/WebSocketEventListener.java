package com.singed.sindesk.websocket.config;

import com.singed.sindesk.domain.user.User;
import com.singed.sindesk.repository.UserRepository;
import com.singed.sindesk.service.utils.MapperUtils;
import com.singed.sindesk.websocket.domain.OnlineUserDTO;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.*;
import java.util.stream.Collectors;


@Component
@Data
@Slf4j
public class WebSocketEventListener {

    private Set<OnlineUserDTO> onlineUsrs;

    @Autowired
    private SimpMessageSendingOperations messageTemplate;

    @Autowired
    private UserRepository userRepository;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event)
    {
        StompHeaderAccessor stompAccessor = StompHeaderAccessor.wrap(event.getMessage());
        @SuppressWarnings("rawtypes")
        GenericMessage connectHeader = (GenericMessage) stompAccessor.getHeader(SimpMessageHeaderAccessor.CONNECT_MESSAGE_HEADER);

        @SuppressWarnings("unchecked")
        Map<String, List<String>> nativeHeaders = (Map<String,List<String>>) connectHeader.getHeaders()
                .get(SimpMessageHeaderAccessor.NATIVE_HEADERS);

        String id = nativeHeaders.get("id").get(0);
        String sessionId = stompAccessor.getSessionId();
        if(this.onlineUsrs==null){
            this.onlineUsrs = new HashSet<>();
        }

        Optional<User> usr = userRepository.findById(id);

        if(usr.isPresent())
        {
            OnlineUserDTO onl =  MapperUtils.mapperObject(usr,OnlineUserDTO.class);
            onl.setSessionId(sessionId);
            this.onlineUsrs.add(onl);

        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(
            SessionDisconnectEvent event
    ){
        StompHeaderAccessor stompAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = stompAccessor.getSessionId();
        OnlineUserDTO offlineUsr = this.onlineUsrs
                .stream()
                .filter((a)->a.getSessionId().equals(sessionId))
                .toList().get(0);

        this.onlineUsrs.remove(offlineUsr);

    }
}
