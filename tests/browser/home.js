const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const ui = require('./utils/ui');

describe('Browser tests', () => {
    let driver = null;
    const url = 'http://localhost:3002';

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    afterEach(() => {
        driver.quit();
    });

    it('Document Title', () => {
        return driver.get(url)
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                expect(title).to.equal('Document');
            });
    });

    it('Register a user', () => {
        const username = 'test' + String(Math.random() * 1000, 10);

        // driver.wait(webdriver.until.elementLocated(webdriver.By.css("button[type='submit']")));

        driver.get(url);
        driver.findElement(webdriver.By.css('nav li #login-link')).click();
        driver.wait(webdriver.until.elementLocated(webdriver.By.css('input[name="fullname"]')));
        driver.findElement(webdriver.By
            .css('input[name="fullname"]'))
            .sendKeys(username);
        driver.findElement(webdriver.By
            .css('input[name="username"]'))
            .sendKeys(username);
        driver.findElement(webdriver.By
            .css('input[name="password"]'))
            .sendKeys(username);
        driver.findElement(webdriver.By
            .css('input[name="passwordConfirm"]'))
            .sendKeys(username);
        driver.findElement(webdriver.By.css('#login-button')).click();

        // return driver.get(url)
        //     .then(() => {
        //         // ui.click('nav li #login-link');
        //     })
        //     .then(() => {
        //         // ui.setValue('input[name="fullname"]', username);
        //     })
        //     .then(() => {
        //         // ui.setValue('input[name="username"]', username);
        //     })
        //     .then(() => {
        //         // ui.setValue('input[name="password"]', username);
        //     })
        //     .then(() => {
        //         // ui.setValue('input[name="passwordConfirmation"]', username);
        //     })
        //     .then(() => {
        //         // ui.click('#login-button');
        //     })
        //     .then(() => {
        //         ui.getText('#profile-link span');
        //     })
        //     .then((text) => {
        //         expect(text).to.eql(username);
        //     });
    });
});
