package com.mk.hoursandtasks.UI;

import com.mk.hoursandtasks.entity.Project;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.entity.user.UserStatus;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TaskTest extends UITestAncestor {

    @Test
    public void AddTaskToProjectSuccess(){
        String projectName = "Test project";

        User user = generateUser(USERNAME, UserStatus.ACTIVE);
        user = creator.saveEntity(user);
        Project project = generateProject(projectName);
        project.setOwner(user);
        project = creator.saveEntity(project);

        WebDriver driver = initWebDriver();

        WebElement username = driver.findElement(By.id("input-username"));
        WebElement password = driver.findElement(By.id("input-password"));
        WebElement loginButton = driver.findElement(By.id("submit"));

        username.sendKeys(USERNAME);
        password.sendKeys(USER_PASSWORD);
        loginButton.click();

        WebDriverWait wait = new WebDriverWait(driver, 5);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@value='"+ projectName + "']")));

        driver.findElement(By.xpath("//input[@value='"+ projectName + "']")).click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@value='Add task']")));
        driver.findElement(By.xpath("//input[@value='Add task']")).click();

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@value='Add new task']")));
        WebElement taskName = driver.findElement(By.xpath("//input[@placeholder='New task']"));
        WebElement taskDescription = driver.findElement(By.xpath("//input[@placeholder='Task description']"));
        WebElement buttonSave = driver.findElement(By.xpath("//input[@value='Save']"));

        taskName.sendKeys("task 1");
        taskDescription.sendKeys("task 1");
        buttonSave.click();
    }
}
