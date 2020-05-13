package com.mk.hoursandtasks.controller;

import com.mk.hoursandtasks.dto.UserDto;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.security.JwtAuthenticationException;
import com.mk.hoursandtasks.security.JwtTokenProvider;
import com.mk.hoursandtasks.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/auth")
public class AuthenticationController  {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<UserDto> login(@RequestBody UserDto userDto){
        System.out.println(userDto.getUsername());
        try {
            String username = userDto.getUsername();
            String password = userDto.getPassword();
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
            authenticationManager.authenticate(authenticationToken);
            User user = userService.findByUsername(username);
            if (user == null){
                throw new UsernameNotFoundException("User not found");
            }
            String token = jwtTokenProvider.createToken(username);
            userDto.setToken(token);
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } catch (JwtAuthenticationException e){
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}
