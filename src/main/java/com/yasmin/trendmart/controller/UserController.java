package com.yasmin.trendmart.controller;

import com.yasmin.trendmart.entity.User;
import com.yasmin.trendmart.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.yasmin.trendmart.dto.LoginRequest;
import com.yasmin.trendmart.dto.LoginResponse;
import com.yasmin.trendmart.security.JwtUtil;
import com.yasmin.trendmart.dto.AddressRequest;


@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public LoginResponse loginUser(
            @RequestBody LoginRequest request
    ) {



        User user = userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );

        if (user == null) {


            return null;

        }

        String token = jwtUtil.generateToken(
                user.getEmail()
        );



        return new LoginResponse(
                token,
                user.getRole(),
                user.getName(),
                user.getId()
        );
    }
    @PutMapping("/address/{id}")
    public User updateAddress(
            @PathVariable Long id,
            @RequestBody AddressRequest request) {

        return userService.updateAddress(id, request);

    }
    @GetMapping("/address/{id}")
    public User getUser(
            @PathVariable Long id) {

        return userService.getUser(id);

    }
}
