package com.chess.backend.repository;

import com.chess.backend.entity.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository
        extends JpaRepository<Invitation, Long> {
}
