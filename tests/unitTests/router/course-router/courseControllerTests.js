const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../../app/routers/course-router/controller');
const { data } = require('../../../../data/data');

describe('Course controllers', () => {
    const db = null;

    let controller = null;
    let request = null;
    let response = null;

    beforeEach(() => {
        request = require('../request-response').getRequestMock();
        response = require('../request-response').getResponseMock();
        request.isAuthenticated = (() => {
            return true;
        });
        controller = init(db, data);
    });

    // it('Get courses', () => {
    //     const request = {
    //         query: {
    //             title: 'JS'
    //         },
    //     }
    //     controller.getCourses(request, response);
    //     expect(response.viewName).to.be.equal('courses');
    // });
})