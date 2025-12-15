package com.chess.backend.config;

import com.chess.backend.websocket.ChessWebSocketHandler;
import com.chess.backend.websocket.InvitationWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final ChessWebSocketHandler chessHandler;

    public WebSocketConfig(ChessWebSocketHandler chessHandler) {
        this.chessHandler = chessHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(chessHandler, "/ws/chess")
                .setAllowedOrigins("*");
    }
}
