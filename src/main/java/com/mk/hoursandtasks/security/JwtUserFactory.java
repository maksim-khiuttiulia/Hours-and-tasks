package com.mk.hoursandtasks.security;

import com.mk.hoursandtasks.entity.user.User;

public class JwtUserFactory {
    public static JwtUserDetails create(User user){
        JwtUserDetails jwtUserDetails = new JwtUserDetails();
        jwtUserDetails.setUserId(user.getUserId());
        jwtUserDetails.setEmail(user.getEmail());
        jwtUserDetails.setUsername(user.getUsername());
        jwtUserDetails.setFirstName(user.getFirstName());
        jwtUserDetails.setLastName(user.getLastName());
        jwtUserDetails.setPassword(user.getPassword());
        jwtUserDetails.setLastPasswordReset(user.getLastPasswordReset());
        jwtUserDetails.setStatus(user.getStatus());
        return jwtUserDetails;
    }
}
