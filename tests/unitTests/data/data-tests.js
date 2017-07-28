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
            };
        },
    };

    // const data = {
    //     pushLikedUser() { },
    //     pushEnrolledCourse() { },
    // };
    const data = init(db);
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

    it('pushEnrolledCourses to be called', (done) => {
        let pushEnrolledCourseStub;
        data.then((d) => {
            pushEnrolledCourseStub = sinon
                .stub(d, 'pushEnrolledCourse');
            pushEnrolledCourseStub.returns(Promise.resolve(users));
            request.user = users;
                request.body = {
                    courseID: courses[0].id,
                };

                courseController.enrollCourse(request, response);
                // .then(() => {
                //     expect(stub).to.be.calledOnce();
                //     stub.restore();
                //     done();
                // })
                // .catch((err) => {
                //     stub.restore();
                //     done(err);
                // });
                expect(pushEnrolledCourseStub).to.be.calledOnce();
                pushEnrolledCourseStub.restore();
                done();
        })
            .catch((err) => {
                pushEnrolledCourseStub.restore();
                done(err);
            });
    });
});
