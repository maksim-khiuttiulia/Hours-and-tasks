package com.mk.hoursandtasks.controller;

import com.mk.hoursandtasks.dto.AuthDto;
import com.mk.hoursandtasks.dto.UserDto;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.exceptions.JwtAuthenticationException;
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

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/api/auth")
public class AuthenticationController extends ControllerAncestor  {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<AuthDto> login(@RequestBody AuthDto authDto){
        try {
            String username = authDto.getUsername();
            String password = authDto.getPassword();
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
            authenticationManager.authenticate(authenticationToken);
            User user = userService.findByUsername(username);
            if (user == null){
                throw new UsernameNotFoundException("User not found");
            }
            String token = jwtTokenProvider.createToken(username);
            AuthDto response = new AuthDto();
            response.setToken(token);
            response.setUsername(username);
            response.setValidAuth(true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (JwtAuthenticationException e){
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    @RequestMapping(value = "/authValid", method = RequestMethod.GET)
    public ResponseEntity<AuthDto> authValid(HttpServletRequest request){
        boolean authValid = false;
        try {
            getCurrentUser(request);
            authValid = true;
        } catch (Throwable  e){
            authValid = false;
        }
        AuthDto authDto = new AuthDto();
        authDto.setValidAuth(authValid);
        return new ResponseEntity<>(authDto, HttpStatus.OK);
    }
}
