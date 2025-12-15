package com.chess.backend.controller;

import com.chess.backend.entity.User;
import com.chess.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/online")
    public List<User> onlineUsers() {
        return service.getOnlineUsers();
    }
}
