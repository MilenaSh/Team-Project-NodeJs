const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { getRequestMock } = require('../router/request-response');
const { getResponseMock } = require('../router/request-response');

const request = getRequestMock();
const response = getResponseMock();

const controllerInit
    = require('../../../app/routers/home-router/controller').init;

const { init } = require('../../../data');

describe('Home data tests', () => {
    let courses = [];
    let users = [];
    let details = {};
    const db = {
        collection() {
            return {
                find() {
                    return {
                        toArray() {
                            return Promise.resolve(courses);
                        },
                    };
                },
                update() {

                },
                findOne() {

                },
            };
        },
    };

    const data = {
        getCourseById() { },
        getCourses() { },
        pushLikedUser() { },
        pullLikedUser() { },
        pushEnrolledCourse() { },
        pullEnrolledCourse() { },
        changeUserAvatar() { },
        getLectureByNumber() { },
        updateUser() { },
    };

    const homeController = controllerInit(db, data);

    beforeEach(() => {
        courses = [{
            id: 1,
            title: 'Java',
            lecturer: 'Doncho',
            usersLiked: [],
        },
        {
            _id: '00000002cae76707e4f55408',
            title: 'C++',
            lecturer: 'Cuki',
            usersLiked: [],
        },
        ];
        users = [{
            id: 1,
            username: 'gosho',
        },
        {
            _id: '00000002cae76707e4f55407',
            username: 'pesho',
        },
        ];
        details = {
            course: 'JS',
            lectures: 'Introduction',
        };
    });

    it('getCourses to have been called',
        (done) => {
            const getCoursesStub = sinon
                .stub(data, 'getCourses')
                .returns(Promise.resolve(courses));

            request.user = users;
            request.params = {
                id: 3,
                number: 1,
            };

            request.isAuthenticated = () => {
                return true;
            };

            homeController.getHome(request, response)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(getCoursesStub).to.be.calledOnce;
                    getCoursesStub.restore();
                    done();
                })
                .catch((err) => {
                    getCoursesStub.restore();
                    done(err);
                });
        });
    it('getCourses to have been called with the right arguments',
        (done) => {
            const getCoursesStub = sinon
                .stub(data, 'getCourses')
                .returns(Promise.resolve(courses));

            request.user = users;
            request.params = {
                id: 3,
                number: 1,
            };

            request.isAuthenticated = () => {
                return true;
            };

            homeController.getHome(request, response)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(getCoursesStub).to.be.calledWith();
                    expect(getCoursesStub).not.to.be.calledWith(2);
                    getCoursesStub.restore();
                    done();
                })
                .catch((err) => {
                    getCoursesStub.restore();
                    done(err);
                });
        });

    it('updateUser to have been called',
        (done) => {
            const getCoursesStub = sinon
                .stub(data, 'updateUser')
                .returns(Promise.resolve(courses));

            request.user = users;
            request.body = {
                username: 'pesho',
            };

            request.isAuthenticated = () => {
                return true;
            };

            homeController.updateProfile(request, response)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(getCoursesStub).to.be.calledOnce;
                    getCoursesStub.restore();
                    done();
                })
                .catch((err) => {
                    getCoursesStub.restore();
                    done(err);
                });
        });
    it('updateUser to have been called with the right arguments',
        (done) => {
            const getCoursesStub = sinon
                .stub(data, 'updateUser')
                .returns(Promise.resolve(courses));

            request.user = users;
            request.body = {
                username: 'pesho',
            };

            request.isAuthenticated = () => {
                return true;
            };

            homeController.updateProfile(request, response)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(getCoursesStub).to.be.calledWith('pesho');
                    expect(getCoursesStub).not.to.be.calledWith('gosho');
                    getCoursesStub.restore();
                    done();
                })
                .catch((err) => {
                    getCoursesStub.restore();
                    done(err);
                });
        });
    it('changeUserAvatar to have been called',
        (done) => {
            const getCoursesStub = sinon
                .stub(data, 'changeUserAvatar')
                .returns(Promise.resolve(courses));

            request.user = users;
            request.body = {
                username: 'pesho',
            };

            request.isAuthenticated = () => {
                return true;
            };

            homeController.changeAvatar(request, response)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(getCoursesStub).to.be.calledOnce;
                    getCoursesStub.restore();
                    done();
                })
                .catch((err) => {
                    getCoursesStub.restore();
                    done(err);
                });
        });
    it('changeUserAvatar to have been called with the right arguments',
        (done) => {
            const getCoursesStub = sinon
                .stub(data, 'changeUserAvatar')
                .returns(Promise.resolve(courses));

            request.user = users;
            request.body = {
                username: 'pesho',
            };

            request.isAuthenticated = () => {
                return true;
            };

            homeController.changeAvatar(request, response)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(getCoursesStub).to.be.calledWith('pesho');
                    expect(getCoursesStub).not.to.be.calledWith('gosho');
                    getCoursesStub.restore();
                    done();
                })
                .catch((err) => {
                    getCoursesStub.restore();
                    done(err);
                });
        });
});
