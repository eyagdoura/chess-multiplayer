package com.chess.backend.websocket;

import com.chess.backend.service.PresenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.*;

@Component
@RequiredArgsConstructor
public class PresenceWebSocketHandler {

    private final PresenceService presenceService;

    /**
     * Appelé quand un client WebSocket se connecte
     */
    @EventListener
    public void handleSessionConnected(SessionConnectedEvent event) {

        StompHeaderAccessor accessor =
                StompHeaderAccessor.wrap(event.getMessage());

        String username = accessor.getFirstNativeHeader("username");

        presenceService.userConnected(username);

        System.out.println("🟢 User connected via WS: " + username);
    }

    /**
     * Appelé quand un client WebSocket se déconnecte
     */
    @EventListener
    public void handleSessionDisconnected(SessionDisconnectEvent event) {

        StompHeaderAccessor accessor =
                StompHeaderAccessor.wrap(event.getMessage());

        String username = accessor.getFirstNativeHeader("username");

        presenceService.userDisconnected(username);

        System.out.println("🔴 User disconnected via WS: " + username);
    }
}
