package com.chess.backend.service;

import com.chess.backend.entity.Invitation;
import com.chess.backend.repository.InvitationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvitationService {

    private final InvitationRepository repo;

    public Invitation send(Invitation i) {
        i.setStatus("PENDING");
        return repo.save(i);
    }

    public Invitation update(Long id, String status) {
        Invitation i = repo.findById(id).orElseThrow();
        i.setStatus(status);
        return repo.save(i);
    }
}
