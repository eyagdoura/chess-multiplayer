package com.chess.backend.service;

import com.chess.backend.entity.User;
import com.chess.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repo;

    public AuthService(UserRepository repo) {
        this.repo = repo;
    }

    public User register(User user) {
        return repo.save(user);
    }

    public User login(String username, String password) {
        User user = repo.findByUsername(username).orElseThrow();
        user.setOnline(true);
        return repo.save(user);
    }
}
