package com.mk.hoursandtasks.exceptions;

import org.springframework.security.core.AuthenticationException;

public class RestAuthenticationException extends AuthenticationException {

    public RestAuthenticationException(String msg, Throwable t) {
        super(msg, t);
    }

    public RestAuthenticationException(String msg) {
        super(msg);
    }
}
