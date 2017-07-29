const { expect } = require('chai');
const sinon = require('sinon');
// const MongoMock = require('mongomock');


const { init } = require('../../../../app/routers/home-router/controller');

describe('Home controllers', () => {
    const db = null;
    // const data = require('../../../../data').init(db);
    let controller = null;
    let request = null;
    let response = null;

    beforeEach(() => {
        request = require('../request-response').getRequestMock();
        response = require('../request-response').getResponseMock();
        request.isAuthenticated = (() => {
            return true;
        });
        controller = init(db);

        request.flash = (() => {
            return 'error';
        });
    });

    // it('Get home page', () => {


    //     controller.getHome(request, response);
    //     expect(response.viewName).to.be.equal('home');
    // });

    it('Get login page', () => {
        controller.getLoginPage(request, response);
        expect(response.viewName).to.be.equal('auth/login');
    });

    it('Get register page', () => {
        controller.getRegisterPage(request, response);
        expect(response.viewName).to.be.equal('auth/register');
    });

    it('If user is not authenticated can not see profile page', () => {
        request.isAuthenticated = (() => {
            return false;
        });
        controller.getProfilePage(request, response);
        expect(response.statusCode).to.equal(401);
    });

    it('Get profile page', () => {
        request.user = [{
            name: 'Pesho',
            enrolledCourses: ['JS'],
        }];

        controller.getProfilePage(request, response);
        expect(response.viewName).to.be.equal('profile');
    });

    it('Get about page', () => {
        controller.getAboutPage(request, response);
        expect(response.viewName).to.be.equal('about-us');
    });
});