package com.chess.backend.controller;

import com.chess.backend.entity.User;
import com.chess.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;

    @PostMapping("/register")
    public User register(@RequestBody User u) {
        return service.register(u);
    }
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return service.login(user);
    }
    @GetMapping("/online")
    public List<User> online() {
        return service.onlineUsers();
    }


}
