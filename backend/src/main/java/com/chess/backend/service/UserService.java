package com.chess.backend.service;

import com.chess.backend.entity.User;
import com.chess.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository repo;
    public UserService(UserRepository repo){ this.repo = repo; }

    public User register(User u){ return repo.save(u); }
    public User login(String u,String p){
        return repo.findByUsername(u)
                .filter(x -> x.getPassword().equals(p))
                .orElseThrow();
    }
}

