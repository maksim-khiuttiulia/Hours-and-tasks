package com.mk.hoursandtasks.integration;

import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.task.Task;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.entity.user.UserStatus;
import com.mk.hoursandtasks.service.TaskService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class TaskServiceTest {

    @Autowired
    private TaskService taskService;

    @Autowired
    private Creator creator;

    private User testUser;

    private Project testProject;

    private Task testTask;

    @Before
    public void initData(){
        testUser = new User();
        testUser.setUserId(1L);
        testUser.setUsername("test1");
        testUser.setLastName("test1LastName");
        testUser.setFirstName("test1FirstName");
        testUser.setStatus(UserStatus.ACTIVE);
        testUser.setEmail("test1@email.com");
        testUser.setPassword("password");


        testProject = new Project();
        testProject.setProjectId(1L);
        testProject.setName("project1");
        testProject.setDescription("project1");
        testProject.setOwner(testUser);
        testUser.getProjects().add(testProject);

        testTask = new Task();
        testTask.setTaskId(1L);
        testTask.setName("task1");
        testTask.setDescription("task1");
        testTask.setIsDone(false);
        testTask.setProject(testProject);
        testProject.getTasks().add(testTask);

        creator.saveEntity(testUser);
        creator.saveEntity(testProject);
        creator.saveEntity(testTask);
    }

    @Test
    public void getTasksSuccess1(){
        List<Task> actualList = taskService.getAll(testUser);

        int expectedCount = 1;
        int actualCount = actualList.size();

        Assert.assertEquals(expectedCount, actualCount);
    }

    @Test
    public void getTasksSuccess2(){
        List<Task> actualList = taskService.getAll(testUser);

        Task task = new Task();
        task.setTaskId(2L);
        task.setName("task2");
        task.setDescription("task2");
        task.setIsDone(false);
        task.setProject(testProject);
        testProject.getTasks().add(task);
        creator.saveEntity(task);

        int expectedCount = 2;
        int actualCount = actualList.size();

        Assert.assertEquals(expectedCount, actualCount);
    }

    @Test
    public void getTasksSuccess3(){
        User user = new User();
        user.setUserId(10000L);
        user.setUsername("newUser");
        creator.saveEntity(user);

        List<Task> actualList = taskService.getAll(user);
        int expectedCount = 0;
        int actualCount = actualList.size();

        Assert.assertEquals(expectedCount, actualCount);
    }
}
