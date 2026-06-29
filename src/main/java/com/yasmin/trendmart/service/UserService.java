package com.yasmin.trendmart.service;

import com.yasmin.trendmart.entity.User;
import com.yasmin.trendmart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.yasmin.trendmart.dto.AddressRequest;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Register User
    public User registerUser(User user) {

        user.setRole("CUSTOMER");

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);

    }

    // Login User
    public User loginUser(String email, String password) {

        User user = userRepository.findByEmail(email);

        if (
                user != null &&
                        passwordEncoder.matches(
                                password,
                                user.getPassword()
                        )
        ) {

            return user;

        }

        return null;

    }
    public User updateAddress(Long id, AddressRequest request) {

        User user = userRepository.findById(id).orElse(null);

        if (user == null) {
            return null;
        }

        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setCity(request.getCity());
        user.setState(request.getState());
        user.setPincode(request.getPincode());

        return userRepository.save(user);
    }
    public User getUser(Long id) {

        return userRepository.findById(id).orElse(null);

    }

}