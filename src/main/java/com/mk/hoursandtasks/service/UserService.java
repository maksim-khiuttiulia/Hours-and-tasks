package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User createNewUser(User user){
        return null;
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User findById(Long id){
        return userRepository.findById(id).orElse(null);
    }

    public User update(Long userId, User userDto){
        return null;
    }

    public void deleteUser(Long userId){
        userRepository.deleteById(userId);
    }
}
