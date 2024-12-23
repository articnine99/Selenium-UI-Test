import { Builder, By, Key, until } from "selenium-webdriver";

async function exampleTest() {
    let driver = new Builder().forBrowser('chrome').build();

    try {
        await driver.get('http://www.google.com/');

        let searchBox = await driver.findElement(By.name('q'));
        await searchBox.sendKeys('Hello World', Key.RETURN);

        await driver.wait(until.elementsLocated(By.id('result-stats')), 10000);

        let title = await driver.getTitle();
        console.log('Page title is: ' + title);
    } finally {
        await driver.quit();
    }
}

exampleTest();