package com.chess.backend.websocket;

import com.chess.backend.entity.Move;
import com.chess.backend.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChessWebSocketHandler {

    private final GameService service;

    @MessageMapping("/game/{id}/move")
    @SendTo("/topic/game/{id}")
    public Move play(@DestinationVariable Long id, Move move) {
        move.setGameId(id);
        return service.saveMove(move);
    }
}
