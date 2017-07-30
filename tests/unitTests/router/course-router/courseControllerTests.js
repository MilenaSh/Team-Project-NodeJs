const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { getRequestMock } = require('../request-response');
const { getResponseMock } = require('../request-response');

const request = getRequestMock();
const response = getResponseMock();

// eslint-disable-next-line max-len
const controllerInit = require('../../../../app/routers/course-router/controller').init;

const { init } = require('../../../../data');

describe('Course controller render tests', () => {
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

    const courseController = controllerInit(db, data);

    beforeEach(() => {
        request.isAuthenticated = () => {
            return true;
        };

        courses = [{
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

    it('Render course by ID', (done) => {
        const getCourseByIdStub = sinon
            .stub(data, 'getCourseById')
            .returns(Promise.resolve());

        request.user = users;
        request.params = {
            id: 3,
        };
        request.body = {
            title: '',
            lecturer: '',
        };

        courseController.getCourseById(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(response.viewName).to.be.equal('selected-course');
                getCourseByIdStub.restore();
                done();
            })
            .catch((err) => {
                getCourseByIdStub.restore();
                done(err);
            });
    });

    it('Get courses', (done) => {
        const getCoursesStub = sinon
            .stub(data, 'getCourses')
            .returns(Promise.resolve(courses));

        const filter = {
            title: '',
        };
        const query = {
            title: '',
        };

        request.filter = filter;
        request.query = query;

        courseController.getCourses(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(response.viewName).to.be.equal('courses');
                getCoursesStub.restore();
                done();
            })
            .catch((err) => {
                getCoursesStub.restore();
                done(err);
            });
    });

    it('Get courses if the user is authenticated', (done) => {
        const getCoursesStub = sinon
            .stub(data, 'getCourses')
            .returns(Promise.resolve(courses));

        const filter = {
            title: '',
        };
        const query = {
            title: '',
        };

        request.filter = filter;
        request.query = query;

        courseController.getCourses(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(response.viewName).to.be.equal('courses');
                getCoursesStub.restore();
                done();
            })
            .catch((err) => {
                getCoursesStub.restore();
                done(err);
            });
    });

    it('Enroll course', (done) => {
        const getCoursesStub = sinon
            .stub(data, 'pushEnrolledCourse')
            .returns(Promise.resolve(courses));

        const filter = {
            title: '',
        };
        const query = {
            title: '',
        };

        request.filter = filter;
        request.query = query;

        courseController.enrollCourse(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(response.viewName).to.be.equal('courses');
                getCoursesStub.restore();
                done();
            })
            .catch((err) => {
                getCoursesStub.restore();
                done(err);
            });
    });

    it('Disenroll course', (done) => {
        const getCoursesStub = sinon
            .stub(data, 'pullEnrolledCourse')
            .returns(Promise.resolve(courses));

        const filter = {
            title: '',
        };
        const query = {
            title: '',
        };

        request.filter = filter;
        request.query = query;

        courseController.disEnrollCourse(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(response.viewName).to.be.equal('courses');
                getCoursesStub.restore();
                done();
            })
            .catch((err) => {
                getCoursesStub.restore();
                done(err);
            });
    });

    it('Get lectures', (done) => {
        const getCoursesStub = sinon
            .stub(data, 'getCourseById')
            .returns(Promise.resolve(courses));

        const filter = {
            title: '',
        };
        const query = {
            title: '',
        };

        request.filter = filter;
        request.query = query;

        courseController.getLectures(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(response.viewName).to.be.equal('lectures');
                getCoursesStub.restore();
                done();
            })
            .catch((err) => {
                getCoursesStub.restore();
                done(err);
            });
    });

    it('Get current lectures', (done) => {
        const getCoursesStub = sinon
            .stub(data, 'getLectureByNumber')
            .returns(Promise.resolve(courses));

        const filter = {
            title: '',
        };
        const query = {
            title: '',
        };

        request.filter = filter;
        request.query = query;

        courseController.getCurrentLecture(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(response.viewName).to.be.equal('selected-lecture');
                getCoursesStub.restore();
                done();
            })
            .catch((err) => {
                getCoursesStub.restore();
                done(err);
            });
    });
});