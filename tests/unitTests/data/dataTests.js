const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../data');

describe('Get data for the courses', () => {
    let courses = [];
    let data = null;
    const db = {
        collection: () => {
            return courses;
        },
    };

    const toArray = () => {
        return Promise.resolve(courses);
    };

    const findOne = () => {
        return Promise.resolve(courses[0]);
    };


    const find = (id) => {
        return {
            toArray, findOne,
        };
    };

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
            expect(collection).to.equal(courses);
        });
    });

    it('Get courses', () => {
        data.then(function(d) {
            return d.getCourses()
                .then((coursesCollection) => {
                    expect(coursesCollection).to.be.equal(courses);
                });
        });
    });

    it('Get course by Id', () => {
        const id = 2;

        data.then(function(d) {
            d.getCourseById(id)
                .then((course) => {
                    expect(course.length).to.be.equal(30);
                });
        });
    });

    it('Push liked user', () => {
        const title = 'NodeJS';
        const lecturer = 'Doncho';
        const user = 'Pesho';
        const update = () => {
            return {
                title,
                lecturer,
                user,
            };
        };

        sinon.stub(db, 'course')
            .callsFake(() => {
                return { update };
            });

        data.then(function(d) {
            return d.pushLikedUser(title, lecturer, user)
                .then((col) => {
                    expect(col).to.be.equal(courses);
                })
                .catch(function() {
                    console.log('Error');
                });
        });
    });

    it('Pull liked user', () => {
        const title = 'NodeJS';
        const lecturer = 'Doncho';
        const user = 'Pesho';
        const update = () => {
            return {
                title,
                lecturer,
                user,
            };
        };

        sinon.stub(db, 'coursesCollection')
            .callsFake(() => {
                return { update };
            });

        data.then(function(d) {
            return d.pullLikedUser(title, lecturer, user)
                .then((col) => {
                    expect(col).to.be.equal(courses);
                });
        });
    });

    it('Push enrolled courses', () => {
        const course = 'JS';
        const courseId = 1;
        const userId = 2;
        const findOne = () => {
            return {
                courseId,
            };
        };

        sinon.stub(db, 'coursesCollection')
            .callsFake(() => {
                return { findOne };
            });
        data.then(function(d) {
            return d.pushEnrolledCourse(courseId, userId)
                .then((foundCourse) => {
                    expect(foundCourse).to.be.equal(course);
                });
        });
    });
});