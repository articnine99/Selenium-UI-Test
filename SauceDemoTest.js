import { Builder, By } from "selenium-webdriver";
import assert from 'assert';

async function testSauceDemo () {
    let driver = new Builder().forBrowser('chrome').build();
    try {
        // Open the target webpage
        await driver.get('https://www.saucedemo.com/');

        // Login, Input username and password
        await driver.findElement(By.xpath('//input[@id="user-name"]')).sendKeys('standard_user');
        await driver.findElement(By.xpath('//input[@id="password"]')).sendKeys('secret_sauce');
        await driver.findElement(By.xpath('//input[@id="login-button"]')).click();

        // Validate title on dashboard page
        let title = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(title.includes('Swag Labs'), true, 'Title does not include "Swag Labs');

        // Validate burger button on dashboard page
        const burgerButton = await driver.findElement(By.xpath('//button[@id="react-burger-menu-btn"]'));
        assert.strictEqual(await burgerButton.isDisplayed(), true, 'Menu button is not visible');

        // Selecting items to cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']")).click();
        await driver.findElement(By.css(".shopping_cart_badge")).click();

        // Validate button remove on cart page
        const buttonRemoveCart = await driver.findElement(By.xpath("//button[@id='remove-sauce-labs-bike-light']")).getText();
        assert.strictEqual(buttonRemoveCart.includes('Remove'), true, 'Remove button is not visible');

        await driver.findElement(By.xpath("//button[@id='checkout']")).click();

        // Validate title on checkout page
        let titleCheckout = await driver.findElement(By.xpath("//span[@class='title']")).getText();
        assert.strictEqual(titleCheckout, "Checkout: Your Information", "Title does not match the expected value.");

        // Input form on the payment cart page
        await driver.findElement(By.xpath("//input[@id='first-name']")).sendKeys("Akbar");
        await driver.findElement(By.xpath("//input[@id='last-name']")).sendKeys("Saputra");
        await driver.findElement(By.xpath("//input[@id='postal-code']")).sendKeys("123456");

        await driver.findElement(By.xpath("//input[@id='continue']")).click();

        // Validate title on checkout page
        let titleCheckout2 = await driver.findElement(By.xpath("//span[@class='title']")).getText();
        assert.strictEqual(titleCheckout2, "Checkout: Overview", "Title does not match the expected value.");

        await driver.findElement(By.xpath("//button[@id='finish']")).click();

        // Validate successful transaction on payment page
        let textCompleteCheckout = await driver.findElement(By.xpath("//h2[@class='complete-header']")).getText();
        assert.strictEqual(textCompleteCheckout, "Thank you for your order!", "Title does not match the expected value.");


    } finally {
        await driver.quit();
    }
}

testSauceDemo();