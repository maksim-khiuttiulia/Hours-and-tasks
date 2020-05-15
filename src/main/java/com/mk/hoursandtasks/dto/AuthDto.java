package com.mk.hoursandtasks.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthDto {
    private String username;
    private String password;
    private String token;
    private Boolean validAuth;
}
