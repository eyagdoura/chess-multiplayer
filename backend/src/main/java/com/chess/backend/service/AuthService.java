package com.chess.backend.service;

import com.chess.backend.entity.User;
import com.chess.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public User login(User input) {

        if (input.getUsername() == null || input.getUsername().isBlank()) {
            throw new RuntimeException("Username is required");
        }

        User user = userRepository
                .findByUsername(input.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("User not found: " + input.getUsername())
                );

        // mot de passe volontairement simple pour le test
        if (!user.getPassword().equals(input.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        user.setOnline(true);
        return userRepository.save(user);
    }

    public User register(User user) {
        return userRepository.save(user);
    }
    public List<User> onlineUsers() {
        return userRepository.findAll()
                .stream()
                .filter(User::isOnline)
                .toList();
    }

}
