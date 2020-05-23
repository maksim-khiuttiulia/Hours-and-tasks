package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.Constant;
import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.task.Task;
import com.mk.hoursandtasks.entity.user.User;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class TaskServiceTest {

    @Autowired
    private TaskService taskService;

    @Test
    public void getTasksSuccess1(){
        Project project = new Project();
        project.setProjectId(Constant.PROJECT_ID_1);

        List<Task> actualList = taskService.getAllInProject(project);

        int expectedCount = Constant.TASK_COUNT_PROJECT_1;
        int actualCount = actualList.size();

        Assert.assertEquals(expectedCount, actualCount);
    }

    @Test
    public void getTasksSuccess2(){
        User user = new User();
        user.setUsername(Constant.USER_USERNAME_1);
        user.setUserId(Constant.USER_ID_1);

        List<Task> actualList = taskService.getAll(user);

        int expectedCount = Constant.TASK_COUNT_USER_1;
        int actualCount = actualList.size();

        Assert.assertEquals(expectedCount, actualCount);
    }

    @Test
    public void getTasksSuccess3(){
        User user = new User();
        user.setUserId(Constant.USER_ID_2);
        user.setUsername(Constant.USER_USERNAME_2);

        List<Task> actualList = taskService.getAll(user);
        int expectedCount = Constant.TASK_COUNT_USER_2;
        int actualCount = actualList.size();

        Assert.assertEquals(expectedCount, actualCount);
    }
}
