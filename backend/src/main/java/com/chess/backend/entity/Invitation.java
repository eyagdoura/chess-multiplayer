package com.chess.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "invitations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Invitation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long fromUserId;
    private Long toUserId;

    private String status; // INVITE / ACCEPT / REFUSE
}
