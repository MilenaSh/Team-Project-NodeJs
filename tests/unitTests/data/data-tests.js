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
    = require('../../../app/routers/course-router/controller').init;

const { init } = require('../../../data');

describe('Sinon-chai tests', () => {
    let courses = [];
    let users = [];
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

    // const data = {
    //     getCourses() { },
    //     pushLikedUser() { },
    //     pushEnrolledCourse() { },
    // };

    let courseController;
    const dataPromise = init(db);
    dataPromise
        .then((d) => {
            courseController = controllerInit(db, d);
            const obj = {
                d: d,
                courseController: courseController,
            };
            return Promise.resolve(obj);
        })
        .then((obj) => {
            it('getCourses to be called', (done) => {
                const getCoursesStub = sinon
                    .stub(obj.d, 'getCourses')
                    .returns(Promise.resolve());

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

                obj.courseController.getCourses(request, response)
                    .then(() => {
                        expect(obj.getCoursesStub).to.be.calledOnce();
                        getCoursesStub.restore();
                        done();
                    })
                    .catch((err) => {
                        getCoursesStub.restore();
                        done(err);
                    });
            });
        })
        .catch((err) => {
            console.log(err);
        });

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
    });

    // afterEach(() => {
    //     db.collection.restore();
    // });

    // it('Pull liked user', () => {
    //     const title = 'NodeJS';
    //     const lecturer = 'Doncho';
    //     const user = 'Pesho';
    //     const update = () => {
    //         return {
    //             title,
    //             lecturer,
    //             user,
    //         };
    //     };

    //     sinon.stub(db, 'coursesCollection')
    //         .callsFake(() => {
    //             return { update };
    //         });

    //     data.then(function (d) {
    //         return d.pullLikedUser(title, lecturer, user)
    //             .then((col) => {
    //                 expect(col).to.be.equal(courses);
    //             });
    //     });
    // });

    // it('pushEnrolledCourses to be called', (done) => {
    //     let pushEnrolledCourseStub;
    //     data.then((d) => {
    //         pushEnrolledCourseStub = sinon
    //             .stub(d, 'pushEnrolledCourse');
    //         pushEnrolledCourseStub.returns(Promise.resolve(users));
    //         request.user = users;
    //         request.body = {
    //             courseID: courses[0].id,
    //         };

    //         courseController.enrollCourse(request, response);
    //         // .then(() => {
    //         //     expect(stub).to.be.calledOnce();
    //         //     stub.restore();
    //         //     done();
    //         // })
    //         // .catch((err) => {
    //         //     stub.restore();
    //         //     done(err);
    //         // });
    //         expect(pushEnrolledCourseStub).to.be.calledOnce();
    //         pushEnrolledCourseStub.restore();
    //         done();
    //     })
    //         .catch((err) => {
    //             pushEnrolledCourseStub.restore();
    //             done(err);
    //         });
    // });
});
