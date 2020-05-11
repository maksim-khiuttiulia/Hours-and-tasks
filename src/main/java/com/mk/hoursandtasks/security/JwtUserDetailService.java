package com.mk.hoursandtasks.security;

import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = userService.findByUsername(s);
        if (user == null){
            throw new UsernameNotFoundException("User " + s + " not found");
        }
        return JwtUserFactory.create(user);
    }
}
