const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { getRequestMock } = require('../router/request-response');
const { getResponseMock } = require('../router/request-response');

const request = getRequestMock();
const response = getResponseMock();

const controllerInit = require('../../../app/routers/course-router/controller').init;

const { init } = require('../../../data');

describe('Data tests', () => {
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

    // const data = new Promise((resolve, reject) => {
    //     const d = {
    //         getCourses() { },
    //         pushLikedUser() { },
    //         pushEnrolledCourse() { },
    //     };
    //     resolve(d);
    // });

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

    it('getCourses to have been called', (done) => {
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
        request.isAuthenticated = () => {
            return true;
        };

        courseController.getCourses(request, response)
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
    it('pushLikedUser to have been called', (done) => {
        const likeCourseStub = sinon
            .stub(data, 'pushLikedUser')
            .returns(Promise.resolve());

        request.user = users;
        request.body = {
            title: '',
            lecturer: '',
        };

        request.isAuthenticated = () => {
            return true;
        };

        courseController.likeCourse(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(likeCourseStub).to.be.calledOnce;
                likeCourseStub.restore();
                done();
            })
            .catch((err) => {
                likeCourseStub.restore();
                done(err);
            });
    });
    it('pushLikedUser to have been called with the right arguments',
        (done) => {
            const likeCourseStub = sinon
                .stub(data, 'pushLikedUser')
                .returns(Promise.resolve());

            request.user = users;
            request.body = {
                title: 'pesho',
                lecturer: '',
            };

            request.isAuthenticated = () => {
                return true;
            };

            courseController.likeCourse(request, response)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(likeCourseStub).to.be.calledWith('pesho');
                    expect(likeCourseStub).not.to.be.calledWith('gosho');
                    likeCourseStub.restore();
                    done();
                })
                .catch((err) => {
                    likeCourseStub.restore();
                    done(err);
                });
        });
    it('pullLikedUser to have been called', (done) => {
        const unlikeCourseStub = sinon
            .stub(data, 'pullLikedUser')
            .returns(Promise.resolve());

        request.user = users;
        request.body = {
            title: '',
            lecturer: '',
        };

        request.isAuthenticated = () => {
            return true;
        };

        courseController.unlikeCourse(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(unlikeCourseStub).to.be.calledOnce;
                unlikeCourseStub.restore();
                done();
            })
            .catch((err) => {
                unlikeCourseStub.restore();
                done(err);
            });
    });
    it('pullLikedUser to have been called with the right arguments', (done) => {
        const unlikeCourseStub = sinon
            .stub(data, 'pullLikedUser')
            .returns(Promise.resolve());

        request.user = users;
        request.body = {
            title: 'pesho',
            lecturer: '',
        };

        request.isAuthenticated = () => {
            return true;
        };

        courseController.unlikeCourse(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(unlikeCourseStub).to.be.calledWith('pesho');
                expect(unlikeCourseStub).not.to.be.calledWith('gosho');
                unlikeCourseStub.restore();
                done();
            })
            .catch((err) => {
                unlikeCourseStub.restore();
                done(err);
            });
    });
    it('pushEnrolledCourse to have been called', (done) => {
        const pushEnrolledCourseStub = sinon
            .stub(data, 'pushEnrolledCourse')
            .returns(Promise.resolve(users));

        request.user = users;
        request.body = {
            courseID: 3,
        };

        request.isAuthenticated = () => {
            return true;
        };

        courseController.enrollCourse(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(pushEnrolledCourseStub).to.be.calledOnce;
                pushEnrolledCourseStub.restore();
                done();
            })
            .catch((err) => {
                pushEnrolledCourseStub.restore();
                done(err);
            });
    });
    it('pushEnrolledCourse to have been called with the right arguments',
        (done) => {
            const pushEnrolledCourseStub = sinon
                .stub(data, 'pushEnrolledCourse')
                .returns(Promise.resolve(users));

            request.user = users;
            request.body = {
                courseID: 3,
            };

            request.isAuthenticated = () => {
                return true;
            };

            courseController.enrollCourse(request, response)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(pushEnrolledCourseStub).to.be.calledWith(3);
                    expect(pushEnrolledCourseStub).not.to.be.calledWith(2);
                    pushEnrolledCourseStub.restore();
                    done();
                })
                .catch((err) => {
                    pushEnrolledCourseStub.restore();
                    done(err);
                });
        });
    it('pullEnrolledCourse to have been called', (done) => {
        const pullEnrolledCourseStub = sinon
            .stub(data, 'pullEnrolledCourse')
            .returns(Promise.resolve(users));

        request.user = users;
        request.body = {
            courseID: 3,
        };

        request.isAuthenticated = () => {
            return true;
        };

        courseController.disEnrollCourse(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(pullEnrolledCourseStub).to.be.calledWith(3);
                expect(pullEnrolledCourseStub).not.to.be.calledWith(2);
                pullEnrolledCourseStub.restore();
                done();
            })
            .catch((err) => {
                pullEnrolledCourseStub.restore();
                done(err);
            });
    });
    it('pullEnrolledCourse to have been called with the right arguments',
        (done) => {
            const pullEnrolledCourseStub = sinon
                .stub(data, 'pullEnrolledCourse')
                .returns(Promise.resolve(users));

            request.user = users;
            request.body = {
                courseID: 3,
            };

            request.isAuthenticated = () => {
                return true;
            };

            courseController.disEnrollCourse(request, response)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(pullEnrolledCourseStub).to.be.calledWith(3);
                    expect(pullEnrolledCourseStub).not.to.be.calledWith(2);
                    pullEnrolledCourseStub.restore();
                    done();
                })
                .catch((err) => {
                    pullEnrolledCourseStub.restore();
                    done(err);
                });
        });
    it('getCourseById to have been called', (done) => {
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

        request.isAuthenticated = () => {
            return true;
        };

        courseController.getLectures(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(getCourseByIdStub).to.be.calledOnce;
                expect(getCourseByIdStub).not.to.be.calledWith(2);
                getCourseByIdStub.restore();
                done();
            })
            .catch((err) => {
                getCourseByIdStub.restore();
                done(err);
            });
    });
    it('getCourseById to have been called with the right arguments', (done) => {
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

        request.isAuthenticated = () => {
            return true;
        };

        courseController.getLectures(request, response)
            .then(() => {
                // eslint-disable-next-line no-unused-expressions
                expect(getCourseByIdStub).not.to.be.calledWith(2);
                getCourseByIdStub.restore();
                done();
            })
            .catch((err) => {
                getCourseByIdStub.restore();
                done(err);
            });
    });
    it('getLectureByNumber to have been called',
        (done) => {
            const getCurrentLectureStub = sinon
                .stub(data, 'getLectureByNumber')
                .returns(Promise.resolve(details));

            request.user = users;
            request.params = {
                id: 3,
                number: 1,
            };

            request.isAuthenticated = () => {
                return true;
            };

            courseController.getCurrentLecture(request, response)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(getCurrentLectureStub).to.be.calledOnce;
                    getCurrentLectureStub.restore();
                    done();
                })
                .catch((err) => {
                    getCurrentLectureStub.restore();
                    done(err);
                });
        });
    it('getLectureByNumber to have been called with the right arguments',
        (done) => {
            const getCurrentLectureStub = sinon
                .stub(data, 'getLectureByNumber')
                .returns(Promise.resolve(details));

            request.user = users;
            request.params = {
                id: 3,
                number: 1,
            };

            request.isAuthenticated = () => {
                return true;
            };

            courseController.getCurrentLecture(request, response)
                .then(() => {
                    // eslint-disable-next-line no-unused-expressions
                    expect(getCurrentLectureStub).to.be.calledWith(3);
                    expect(getCurrentLectureStub).not.to.be.calledWith(2);
                    getCurrentLectureStub.restore();
                    done();
                })
                .catch((err) => {
                    getCurrentLectureStub.restore();
                    done(err);
                });
        });
});