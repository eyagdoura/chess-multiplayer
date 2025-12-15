package com.chess.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long whitePlayerId;
    private Long blackPlayerId;

    private String status; // ONGOING / FINISHED
}
