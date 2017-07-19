const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../../app/routers/home-router/controller');

describe('Home controllers', () => {
    const db = null;
    // let passport = null;
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
    });

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

    // it('Get profile page', () => {
    //     const user = ['Pesho'];
    //     //request.user = ['Pesho'];

    //     const enrolledCourses = user[0].enrolledCourses;

    //     controller.getProfilePage(request, response);
    //     expect(response.viewName).to.be.equal('profile');
    // });
});