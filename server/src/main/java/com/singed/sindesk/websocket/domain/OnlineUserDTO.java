package com.singed.sindesk.websocket.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OnlineUserDTO {
    private String userId;
    private String sessionId;
    private String username;
    private Integer noOfNewMessages;
    private String status;

    @Override
    public int hashCode() {
        int prime = 31;
        return prime+ ((userId==null)?0:prime+userId.hashCode());
    }

    @Override
    public boolean equals(Object obj) {
        if(obj==null){
            return false;
        }
        OnlineUserDTO user = (OnlineUserDTO) obj;
        if(!this.userId.equals(((OnlineUserDTO) obj).getUserId())){
            return false;
        }
        else if(!this.sessionId.equals(((OnlineUserDTO) obj).sessionId)){
            return false;
        }
        return true;
    }
}