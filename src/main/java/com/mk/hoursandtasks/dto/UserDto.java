package com.mk.hoursandtasks.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {
    private Long userId;

    private String username;

    private String email;

    private String password;

    private String firstName;

    private String lastName;

}
