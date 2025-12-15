package com.chess.backend.controller;

import com.chess.backend.service.PresenceService;
import com.chess.backend.websocket.ChessWebSocketHandler;

import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private final ChessWebSocketHandler wsHandler;
    private final PresenceService presenceService;

    public UserController(ChessWebSocketHandler wsHandler, PresenceService presenceService) {
        this.wsHandler = wsHandler;
        this.presenceService = presenceService;
    }

    @GetMapping("/online")
    public Set<String> onlineUsers() {
        return presenceService.getOnlineUsers();
    }
}