package com.chess.backend.controller;

import com.chess.backend.entity.*;
import com.chess.backend.repository.GameRepository;
import com.chess.backend.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameService service;
    @GetMapping("/{id}")
    public Game getGame(@PathVariable Long id) {
        return gameService.getGame(id);
    }
    @GetMapping("/{id}/moves")
    public List<Move> history(@PathVariable Long id) {
        return service.history(id);
    }
}
