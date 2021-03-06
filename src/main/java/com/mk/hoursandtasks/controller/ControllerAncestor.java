package com.mk.hoursandtasks.controller;

import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.exceptions.RestAuthenticationException;
import com.mk.hoursandtasks.security.JwtTokenProvider;
import com.mk.hoursandtasks.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;

public class ControllerAncestor {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    protected User getCurrentUser(HttpServletRequest request){
        String token = tokenProvider.resolveToken(request);
        if (token == null){
            throw new RestAuthenticationException("Token invalid");
        }
        String username = tokenProvider.getUsername(token);
        if (username == null){
            throw new RestAuthenticationException("Token invalid");
        }
        User user = userService.findByUsername(username);
        if (user == null){
            throw new RestAuthenticationException("User not exists");
        }
        return user;
    }
}
