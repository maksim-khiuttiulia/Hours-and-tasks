package com.mk.hoursandtasks.UI;

import com.mk.hoursandtasks.Creator;
import com.mk.hoursandtasks.TestAncestor;
import org.junit.runner.RunWith;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UITestAncestor extends TestAncestor {

    private static final String URL = "http://localhost:8080";

    @Autowired
    protected Creator creator;

    protected WebDriver initWebDriver(){
        System.setProperty("webdriver.chrome.driver", "src/test/resources/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get(URL);
        return driver;
    }
}
