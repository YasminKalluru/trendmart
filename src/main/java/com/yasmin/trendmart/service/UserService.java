package com.yasmin.trendmart.service;

import com.yasmin.trendmart.entity.User;
import com.yasmin.trendmart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public User registerUser(User user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    public String loginUser(String email, String password) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return "User not found";
        }

        boolean isPasswordCorrect =
                passwordEncoder.matches(password, user.getPassword());

        if (isPasswordCorrect) {
            return "Login successful";
        } else {
            return "Invalid password";
        }
    }
}