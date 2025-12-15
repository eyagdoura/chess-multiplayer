package com.chess.backend.controller;

import com.chess.backend.entity.Game;
import com.chess.backend.entity.Move;
import com.chess.backend.service.GameService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin("*")
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    // =========================
    // 1️⃣ Créer une partie
    // =========================
    @PostMapping
    public Game createGame(@RequestParam String white,
                           @RequestParam String black) {
        return gameService.createGame(white, black);
    }

    // =========================
    // 2️⃣ Sauvegarder un coup
    // (utile pour test REST)
    // =========================
    @PostMapping("/{gameId}/moves")
    public Move saveMove(@PathVariable Long gameId,
                         @RequestParam String from,
                         @RequestParam String to,
                         @RequestParam String player) {
        return gameService.saveMove(gameId, from, to, player);
    }

    // =========================
    // 3️⃣ Récupérer les coups
    // (reprise de partie)
    // =========================
    @GetMapping("/{gameId}/moves")
    public List<Move> getMoves(@PathVariable Long gameId) {
        return gameService.getMoves(gameId);
    }

    // =========================
    // 4️⃣ Récupérer une partie
    // =========================
    @GetMapping("/{gameId}")
    public Game getGame(@PathVariable Long gameId) {
        return gameService.getGame(gameId);
    }
}
