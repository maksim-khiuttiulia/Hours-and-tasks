package com.mk.hoursandtasks.UI;

import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.entity.user.UserStatus;
import org.junit.Assert;
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
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class LoginTest extends UITestAncestor {

    @Test
    public void LoginTestSuccess(){
        User user = generateUser(USERNAME, UserStatus.ACTIVE);
        user = creator.saveEntity(user);

        WebDriver driver = initWebDriver();
        WebElement username = driver.findElement(By.id("input-username"));
        WebElement password = driver.findElement(By.id("input-password"));
        WebElement loginButton = driver.findElement(By.id("submit"));

        username.sendKeys(USERNAME);
        password.sendKeys(USER_PASSWORD);
        loginButton.click();

        boolean serverErrorExists = driver.findElements(By.id("server-error")).size() > 0;
        boolean userErrorExists = driver.findElements(By.id("user-error")).size() > 0;
        Assert.assertFalse(serverErrorExists);
        Assert.assertFalse(userErrorExists);
    }

    @Test
    public void LoginTestFailed_WrongUsername(){
        WebDriver driver = initWebDriver();
        WebElement username = driver.findElement(By.id("input-username"));
        WebElement password = driver.findElement(By.id("input-password"));
        WebElement loginButton = driver.findElement(By.id("submit"));

        username.sendKeys("Badusername");
        password.sendKeys(USER_PASSWORD);
        loginButton.click();

        WebDriverWait wait = new WebDriverWait(driver, 5);

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("server-error")));
    }
}
