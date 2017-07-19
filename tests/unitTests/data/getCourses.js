const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../data');

describe('Get data for the courses', () => {
    let courses = [];
    let data = null;
    const db = {
        collection: () => {},
    };

    const toArray = () => {
        return Promise.resolve(courses);
    };

    const find = () => {
        return {
            toArray,
        };
    };

    beforeEach(() => {
        courses = ['C#', 'Java'];
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return { find };
            });
        data = init(db);
    });

    afterEach(() => {
        db.collection.restore();
    });

    // Has to use data
    it('expect to return courses', () => {
        return ((collection) => {
            console.log();
            expect(collection).to.equal(courses);
        });
    });
});