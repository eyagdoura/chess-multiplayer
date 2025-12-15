package com.chess.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Move {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long gameId;
    private String fromSquare;
    private String toSquare;
    private int moveNumber;
}
