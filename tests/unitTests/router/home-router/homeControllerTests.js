const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../../app/routers/home-router/controller');

describe('Response render & status in home controllers', () => {
    const db = null;
    let controller = null;
    let request = null;
    let response = null;

    const data = {
        getCourseById() {},
        getCourses() {},
        pushLikedUser() {},
        pullLikedUser() {},
        pushEnrolledCourse() {},
        pullEnrolledCourse() {},
        changeUserAvatar() {},
        getLectureByNumber() {},
        updateUser() {},
    };

    const courses = [{
            id: 1,
            title: 'Java',
            lecturer: 'Doncho',
        },
        {
            _id: '00000002cae76707e4f55408',
            title: 'C++',
            lecturer: 'Cuki',
        },
    ];

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

    it('Get login page', () => {
        controller.getLoginPage(request, response);
        expect(response.viewName).to.be.equal('auth/login');
    });

    it('Get register page', () => {
        controller.getRegisterPage(request, response);
        expect(response.viewName).to.be.equal('auth/register');
    });

    it('If user is NOT authenticated can not see profile page', () => {
        request.isAuthenticated = (() => {
            return false;
        });
        controller.getProfilePage(request, response);
        expect(response.statusCode).to.equal(401);
        expect(response.viewName).to.be.equal('unauthorized');
    });

    it('Get profile page if the user is authenticated', () => {
        request.user = [{
            name: 'Pesho',
            enrolledCourses: ['JS'],
        }];

        controller.getProfilePage(request, response);
        expect(response.viewName).to.be.equal('profile');
    });

    it('Get contact page', () => {
        controller.getContactPage(request, response);
        expect(response.viewName).to.be.equal('contact-form');
    });

    it('Serve chat', () => {
        controller.serveChat(request, response);
        expect(response.viewName).to.be.equal('chat');
    });

    it('Get about page', () => {
        controller.getAboutPage(request, response);
        expect(response.viewName).to.be.equal('about-us');
    });

    // it('Change avatar', (done) => {
    //     request.body = {
    //         username: '',
    //     };

    //     const usersCollection = '';

    //     const changeAvatarStub = sinon
    //         .stub(data, 'changeUserAvatar')
    //         .returns(Promise.resolve());

    //     controller.changeAvatar(request, response);
    //     expect(response.statusCode).to.equal(201);
    // });

    it('Get 404', () => {
        controller.get404(request, response);
        expect(response.viewName).to.be.equal('404');
    });
});