const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');
const ui = require('./utils/ui');

describe('Browser tests', () => {
    let driver = null;
    const url = 'http://localhost:3002';

    beforeEach(() => {
        driver = setupDriver('chrome');
        ui.setDriver(driver);
    });

    afterEach(() => {
        return driver.quit();
    });

    it('Title', () => {
        return driver.get(url)
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                expect(title).to.equal('Course Overflow');
            });
    });

    it('Register a user', () => {
        const username = 'Testing' +
            String(parseInt(Math.random() * 1000, 10), 10);
        const password = 'Testing*' +
            String(parseInt(Math.random() * 1000, 10), 10);

        return driver.get(url)
            .then(() => {
                return ui.click('nav li #register-link');
            })
            .then(() => {
                return ui.setValue('input[name=fullname]', username);
            })
            .then(() => {
                return ui.setValue('input[name="username"]', username);
            })
            .then(() => {
                return ui.setValue('input[name="password"]', password);
            })
            .then(() => {
                return ui.setValue('input[name="passwordConfirmation"]',
                    password);
            })
            .then(() => {
                return ui.click('#register-button');
            })
            .then(() => {
                return ui.getText('#profile-link span');
            })
            .then((text) => {
                expect(text).to.eql(username);
            });
    });

    it('Use tabs course', () => {
        const username = 'Testing' +
            String(parseInt(Math.random() * 1000, 10), 10);
        const password = 'Testing*' +
            String(parseInt(Math.random() * 1000, 10), 10);

        return driver.get(url)
            .then(() => {
                return ui.click('nav li #register-link');
            })
            .then(() => {
                return ui.setValue('input[name=fullname]', username);
            })
            .then(() => {
                return ui.setValue('input[name="username"]', username);
            })
            .then(() => {
                return ui.setValue('input[name="password"]', password);
            })
            .then(() => {
                return ui.setValue('input[name="passwordConfirmation"]',
                    password);
            })
            .then(() => {
                return ui.click('#register-button');
            })
            .then(() => {
                return ui.click('#courses-nav');
            })
            .then(() => {
                return ui.click('#chat-nav');
            })
            .then(() => {
                return ui.click('#logout-link');
            })
            .then(() => {
                return ui.getText('#jumbotron-button');
            })
            .then((text) => {
                expect(text).to.equal('Check our courses');
            });
    });
});
