package com.mk.hoursandtasks.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mk.hoursandtasks.dto.UserDto;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.service.UserService;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(AuthenticationController.class)
class AuthenticationControllerTest {
    private static final Long USER_ID_1 = 1L;
    private static final String USER_USERNAME_1 = "test";
    private static final String USER_PASSWORD_1 = "password";

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @Before
    public void init(){

        User user = new User();
        user.setUserId(1L);
        user.setUsername("test");
        user.setPassword("$2a$10$ITjRTdRw4E4n3aa2z0EWteNOavKfBZBl0dS4EkYtZiIKmcL2U9rbC");
        user.setEmail("test@test.test");
        user.setFirstName("test");
        user.setLastName("test");
        Mockito.when(userService.findByUsername(user.getUsername())).thenReturn(user);
    }

    @Test
    public void loginSuccess() throws Exception {
        UserDto userDto = new UserDto();
        userDto.setUsername(USER_USERNAME_1);
        userDto.setPassword(USER_PASSWORD_1);
        String content = objectMapper.writeValueAsString(userDto);
        MvcResult mvcResult = mvc.perform(post("/api/auth/login", content).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();
        content = mvcResult.getResponse().getContentAsString();
        UserDto response = objectMapper.readValue(content, UserDto.class);
        assertNotNull(response.getToken());
    }

}