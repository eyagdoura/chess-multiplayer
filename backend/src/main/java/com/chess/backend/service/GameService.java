package com.chess.backend.service;

import com.chess.backend.entity.*;
import com.chess.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepo;
    private final MoveRepository moveRepo;

    public Game create(Long p1, Long p2) {
        Game g = new Game();
        g.setWhitePlayerId(p1);
        g.setBlackPlayerId(p2);
        g.setStatus("ONGOING");
        return gameRepo.save(g);
    }

    public Move saveMove(Move m) {
        return moveRepo.save(m);
    }
    public Game getGame(Long id) {
        return gameRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));
    }
    public List<Move> history(Long gameId) {
        return moveRepo.findByGameIdOrderByMoveNumber(gameId);
    }
}
