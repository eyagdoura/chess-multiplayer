package com.chess.backend.controller;

import com.chess.backend.entity.Invitation;
import com.chess.backend.service.InvitationService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class InvitationController {

    private final InvitationService service;

    public InvitationController(InvitationService service) {
        this.service = service;
    }

    @MessageMapping("/invite")
    public void invite(Invitation invitation) {
        service.sendInvitation(invitation);
    }
}
