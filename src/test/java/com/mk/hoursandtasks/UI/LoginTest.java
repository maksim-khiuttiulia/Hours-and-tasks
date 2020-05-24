package com.mk.hoursandtasks.UI;

import com.mk.hoursandtasks.Creator;
import com.mk.hoursandtasks.TestAncestor;
import com.mk.hoursandtasks.entity.user.User;
import com.mk.hoursandtasks.entity.user.UserStatus;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class LoginTest extends TestAncestor {

    private static final String URL = "http://localhost:8080/";

    @Autowired
    private Creator creator;


    @Test
    public void LoginTestSuccess(){
        User user = generateUser(USERNAME, UserStatus.ACTIVE);
        user = creator.saveEntity(user);

        System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get(URL);
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
        System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get(URL);
        WebElement username = driver.findElement(By.id("input-username"));
        WebElement password = driver.findElement(By.id("input-password"));
        WebElement loginButton = driver.findElement(By.id("submit"));

        username.sendKeys("Badusername");
        password.sendKeys(USER_PASSWORD);
        loginButton.click();

        boolean serverErrorExists = driver.findElements(By.id("server-error")).size() > 0;
        boolean userErrorExists = driver.findElements(By.id("user-error")).size() > 0;
        Assert.assertTrue(serverErrorExists);
        Assert.assertFalse(userErrorExists);
    }
}
