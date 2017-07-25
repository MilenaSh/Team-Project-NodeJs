const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const webdriver = require('selenium-webdriver');

describe('Selenium Tests', () => {
    let driver = null;

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    it('Document Title', () => {
        return driver.get('localhost:3000')
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                expect(title).to.equal('Document');
            });
    });
});
