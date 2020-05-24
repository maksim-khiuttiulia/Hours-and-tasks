package com.mk.hoursandtasks.service;

import com.mk.hoursandtasks.Creator;
import com.mk.hoursandtasks.TestAncestor;
import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.entity.user.UserStatus;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class ProjectServiceTest extends TestAncestor {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private Creator creator;


    @Test
    public void getUserProjects1(){
        User user = generateUser("test", UserStatus.ACTIVE);
        user = creator.saveEntity(user);

        Project project = generateProject("project1");
        project.setOwner(user);

        creator.saveEntity(project);

        List<Project> projects = projectService.getAllProjects(user);

        int expected = 1;
        int actual = projects.size();

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void getUserProjects2(){
        User user = generateUser("test", UserStatus.ACTIVE);
        user = creator.saveEntity(user);

        Project project1 = generateProject("project1");
        project1.setOwner(user);
        creator.saveEntity(project1);

        Project project2 = generateProject("project2");
        project2.setOwner(user);
        creator.saveEntity(project2);

        List<Project> projects = projectService.getAllProjects(user);

        int expected = 2;
        int actual = projects.size();

        Assert.assertEquals(expected, actual);
    }

    @Test
    public void getUserProjects3(){
        User user = generateUser("test", UserStatus.ACTIVE);
        user = creator.saveEntity(user);

        List<Project> projects = projectService.getAllProjects(user);

        int expected = 0;
        int actual = projects.size();

        Assert.assertEquals(expected, actual);
    }
}