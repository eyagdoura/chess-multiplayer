package com.chess.backend.websocket;


import com.chess.backend.entity.Game;
import com.chess.backend.entity.Invitation;
import com.chess.backend.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class InvitationWebSocketHandler {

    private final GameService gameService;

    @MessageMapping("/invite")
    @SendTo("/topic/invitations")
    public Invitation handleInvitation(Invitation dto) {

        // si accepté → créer la partie
        if ("ACCEPT".equals(dto.getStatus())) {
            Game game = gameService.create(
                    dto.getFromUserId(),
                    dto.getToUserId()
            );

            // on renvoie l'id de la partie
            dto.setStatus("GAME_CREATED:" + game.getId());
        }

        return dto;
    }
}
