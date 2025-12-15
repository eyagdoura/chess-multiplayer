package com.chess.backend.service;

import com.chess.backend.entity.User;
import com.chess.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public List<User> getOnlineUsers() {
        return repo.findAll().stream()
                .filter(User::isOnline)
                .toList();
    }
}
