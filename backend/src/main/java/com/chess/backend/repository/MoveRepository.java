package com.chess.backend.repository;

import com.chess.backend.entity.Move;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoveRepository extends JpaRepository<Move, Long> {

    List<Move> findByGame_IdOrderByMoveNumber(Long gameId);
}



