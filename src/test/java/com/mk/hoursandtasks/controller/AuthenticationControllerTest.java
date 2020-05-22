package com.mk.hoursandtasks.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.mk.hoursandtasks.dto.AuthDto;
import com.mk.hoursandtasks.dto.UserDto;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.entity.user.UserStatus;
import com.mk.hoursandtasks.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
@AutoConfigureMockMvc
class AuthenticationControllerTest {
    private static final Long USER_ID_1 = 1L;
    private static final String USER_USERNAME_1 = "maks";
    private static final String USER_PASSWORD_1 = "password";
    private static final String USER_PASSWORD_HASH_1 = "$2a$10$ITjRTdRw4E4n3aa2z0EWteNOavKfBZBl0dS4EkYtZiIKmcL2U9rbC";

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @InjectMocks
    private AuthenticationController authenticationController;

    @MockBean(name = "userService")
    private UserService userService;

    @BeforeEach
    public void init(){
        MockitoAnnotations.initMocks(this);
        User user = new User();
        user.setUserId(1L);
        user.setUsername(USER_USERNAME_1);
        user.setPassword(USER_PASSWORD_HASH_1);
        user.setEmail("test@test.test");
        user.setFirstName("test");
        user.setLastName("test");
        user.setStatus(UserStatus.ACTIVE);
        Mockito.when(userService.findByUsername(user.getUsername())).thenReturn(user);
    }

    @Test
    public void loginSuccess() throws Exception {
        UserDto userDto = new UserDto();
        userDto.setUsername(USER_USERNAME_1);
        userDto.setPassword(USER_PASSWORD_1);
        String content = objectMapper.writeValueAsString(userDto);
        MvcResult mvcResult = mvc.perform(post("/api/auth/login").content(content).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();
        content = mvcResult.getResponse().getContentAsString();
        UserDto response = objectMapper.readValue(content, UserDto.class);
        assertNotNull(response.getToken());
    }

    @Test
    public void loginFailedWrongUsername() throws Exception {
        UserDto userDto = new UserDto();
        userDto.setUsername("notexisting");
        userDto.setPassword(USER_PASSWORD_1);
        String content = objectMapper.writeValueAsString(userDto);
        MvcResult mvcResult = mvc.perform(post("/api/auth/login").content(content).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError()).andReturn();
    }

    @Test
    public void loginFailedWrongPassword() throws Exception {
        UserDto userDto = new UserDto();
        userDto.setUsername(USER_USERNAME_1);
        userDto.setPassword("WrongPassword");
        String content = objectMapper.writeValueAsString(userDto);
        MvcResult mvcResult = mvc.perform(post("/api/auth/login").content(content).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError()).andReturn();
    }


    @Test
    public void authValidSuccess() throws Exception {
        AuthDto request = new AuthDto();
        request.setUsername(USER_USERNAME_1);
        request.setPassword(USER_PASSWORD_1);
        String content = objectMapper.writeValueAsString(request);
        MvcResult mvcResult = mvc.perform(post("/api/auth/login")
                .content(content)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        content = mvcResult.getResponse().getContentAsString();
        AuthDto response = objectMapper.readValue(content, AuthDto.class);
        String token = response.getToken();

        mvcResult = mvc.perform(get("/api/auth/authValid")
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andReturn();
        content = mvcResult.getResponse().getContentAsString();
        response = objectMapper.readValue(content, AuthDto.class);

        assertTrue(response.getValidAuth());
    }
}