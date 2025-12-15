package com.chess.backend.websocket;

import com.chess.backend.service.GameService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.net.URI;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChessWebSocketHandler extends TextWebSocketHandler {

    private final Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
    private final ObjectMapper mapper = new ObjectMapper();
    private final GameService gameService;

    public ChessWebSocketHandler(GameService gameService) {
        this.gameService = gameService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        URI uri = session.getUri();
        if (uri != null && uri.getQuery() != null) {
            String username = uri.getQuery().split("=")[1];
            sessions.put(username, session);
            System.out.println("Chess WS connected: " + username);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            Map<String, Object> payload =
                    mapper.readValue(message.getPayload(), Map.class);

            String type = (String) payload.get("type");

            if ("MOVE".equals(type)) {
                Long gameId = Long.valueOf(payload.get("gameId").toString());
                String from = (String) payload.get("from");
                String to = (String) payload.get("to");
                String player = (String) payload.get("player");

                gameService.saveMove(gameId, from, to, player);

                sessions.forEach((username, ws) -> {
                    if (!username.equals(player)) {
                        try {
                            ws.sendMessage(new TextMessage(message.getPayload()));
                        } catch (Exception ignored) {}
                    }
                });
            }
        } catch (Exception e) {
            System.err.println("WebSocket error: " + e.getMessage());
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        sessions.values().remove(session);
    }
}
