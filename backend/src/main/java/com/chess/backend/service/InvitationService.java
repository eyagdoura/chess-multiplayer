package com.chess.backend.service;

import com.chess.backend.entity.Invitation;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class InvitationService {

    private final SimpMessagingTemplate messaging;

    public InvitationService(SimpMessagingTemplate messaging) {
        this.messaging = messaging;
    }

    public void sendInvitation(Invitation invitation) {
        messaging.convertAndSend(
                "/topic/invitations/" + invitation.getTo(),
                invitation
        );
    }
}
