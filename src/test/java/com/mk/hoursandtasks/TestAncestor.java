package com.mk.hoursandtasks;

import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.entity.user.UserStatus;

public abstract class TestAncestor {

    public static final String USERNAME = "test";
    public static final String USER_PASSWORD = "password";
    public static final String USER_PASSWORD_HASH = "$2a$10$ITjRTdRw4E4n3aa2z0EWteNOavKfBZBl0dS4EkYtZiIKmcL2U9rbC";

    protected static User generateUser(String username, UserStatus status){
        User user = new User();
        user.setUsername(username);
        user.setPassword(USER_PASSWORD_HASH);
        user.setStatus(status);
        user.setEmail(username + "@test.mail");
        user.setFirstName(username);
        user.setLastName(username);

        return user;
    }

    protected static Project generateProject(String projectName){
        Project project = new Project();
        project.setName(projectName);
        project.setDescription(projectName);
        return project;
    }
}
