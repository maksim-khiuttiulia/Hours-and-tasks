package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder;

    @PostConstruct
    public void init(){
        passwordEncoder = new BCryptPasswordEncoder();
    }

    @Transactional(rollbackOn = Exception.class)
    public User createNewUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User newUser = userRepository.save(user);
        return newUser;
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public User findById(Long id){
        return userRepository.findById(id).orElse(null);
    }

    public User update(Long userId, User user){
        return null;
    }

    public void deleteUser(Long userId){
        userRepository.deleteById(userId);
    }
}
