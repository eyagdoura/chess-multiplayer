package com.chess.backend.service;

import com.chess.backend.entity.Game;
import com.chess.backend.entity.Move;
import com.chess.backend.repository.GameRepository;
import com.chess.backend.repository.MoveRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class GameService {

    private final GameRepository gameRepo;
    private final MoveRepository moveRepo;

    public GameService(GameRepository gameRepo, MoveRepository moveRepo) {
        this.gameRepo = gameRepo;
        this.moveRepo = moveRepo;
    }

    public Game createGame(String white, String black) {
        Game game = new Game();
        game.setWhitePlayer(white);
        game.setBlackPlayer(black);
        game.setFinished(false);
        return gameRepo.save(game);
    }

    public Move saveMove(Long gameId, String from, String to, String player) {
        Game game = gameRepo.findById(gameId).orElseThrow();

        int moveNumber = moveRepo.findByGame_IdOrderByMoveNumber(gameId).size() + 1;

        Move move = new Move();
        move.setGame(game);
        move.setFromPosition(from);
        move.setToPosition(to);
        move.setPlayer(player);
        move.setMoveNumber(moveNumber);

        return moveRepo.save(move);
    }

    public List<Move> getMoves(Long gameId) {
        return moveRepo.findByGame_IdOrderByMoveNumber(gameId);
    }

    public Game getGame(Long gameId) {
        return gameRepo.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));
    }

}
