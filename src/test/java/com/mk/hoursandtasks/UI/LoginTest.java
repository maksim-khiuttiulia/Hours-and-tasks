package com.mk.hoursandtasks.UI;

import com.mk.hoursandtasks.Creator;
import com.mk.hoursandtasks.TestAncestor;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.DirtiesContext;

@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class LoginTest extends TestAncestor {

    private static final String USERNAME_1 = "test1";

    @Autowired
    private Creator creator;


    @Test
    public void LoginTestSuccess(){
        System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://hours-and-tasks.herokuapp.com/");
        WebElement username = driver.findElement(By.xpath("//input[@placeholder='username']"));
        WebElement password = driver.findElement(By.xpath("//input[@placeholder='password']"));
        WebElement loginButton = driver.findElement(By.xpath("//button[text()='Login']"));

        username.sendKeys(USERNAME_1);
        //password.sendKeys(USER_PASSWORD);
    }
}
