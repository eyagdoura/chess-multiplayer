package com.chess.backend.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.net.URI;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class InvitationWebSocketHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        URI uri = session.getUri();
        if (uri != null && uri.getQuery() != null) {
            String username = uri.getQuery().split("=")[1];
            sessions.put(username, session);
            System.out.println("WebSocket connected: " + username);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Map<String, String> payload = mapper.readValue(message.getPayload(), Map.class);

        String to = payload.get("to");
        if (sessions.containsKey(to)) {
            sessions.get(to).sendMessage(new TextMessage(message.getPayload()));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.values().remove(session);
    }
}
