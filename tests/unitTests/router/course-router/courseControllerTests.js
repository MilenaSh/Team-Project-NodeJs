const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../../app/routers/course-router/controller');
const dataInit = require('../../../../data/data').init;
//const courses = [];
const db = {
    collection: () => {
        return {
            find: () => {
                return {
                    toArray: () => {
                        return Promise.resolve();
                    },
                };
            },
        };
    },
};

const dataPromise = dataInit(db);

describe('Course controllers', () => {
    // data = null;

    // let toArray = () => {
    //     return Promise.resolve(courses);
    // };

    // let find = (id) => {
    //     console.log(id);
    //     return {
    //         toArray,
    //     };
    // };

    // afterEach(() => {
    //     db.collection.restore();
    // });

    let controller = null;
    let request = null;
    let response = null;

    beforeEach(() => {
        request = require('../request-response').getRequestMock();
        response = require('../request-response').getResponseMock();
        controller = init(db);

        request.isAuthenticated = () => {
            return true;
        };
    });

    it('Get courses', () => {
        request = {
            query: {
                title: 'JS',
            },
        };

        dataPromise
            .then((d) => {
                controller = init(db, d);
                const obj = {
                    d,
                    controller,
                };
                return Promise.resolve(obj);
            })
            .then((obj) => {
                return obj.controller.getCourses(request, response);
            })
            .then(() => {
                expect(response.viewName).to.be.equal('home');
            });
    });

    it('Enroll courses', () => {
        const userID = null;
        const courseID = null;

        request.user = [{
            userID: 1,
            courseID: 1,
        }];

        // dataPromise
        //     .then((d) => {
        //         controller = init(db, d);
        //         const obj = {
        //             d,
        //             controller,
        //         };
        //         return Promise.resolve(obj);
        //     })
        //     .then((obj) => {
        //         return obj.controller.enrollCourse(request, response);
        //     })
        //     .then(() => {
        //          expect(response.statusCode).to.equal(200);
        //     });

        controller.enrollCourse(request, response)
            .then(() => {
                expect(response.statusCode).to.equal(200);
            });
    });
});