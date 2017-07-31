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

    let toArray = () => {
        return Promise.resolve(courses);
    };

    let findOne = () => {
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
        data.then(function (d) {
            return d.getCourses()
                .then((coursesCollection) => {
                    expect(coursesCollection).to.be.equal(courses);
                });
        });
    });

    it('Get course by Id', (done) => {
        const id = 2;

        toArray = () => {
            return Promise.resolve(courses[0]);
        };

        data.then(function (d) {
            d.getCourseById(id)
                .then((course) => {
                    expect(course.title).to.be.equal('Java');
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        })
            .catch((err) => {
                done(err);
            });
    });

    it('Push liked user', () => {
        const title = 'NodeJS';
        const lecturer = 'Doncho';
        const user = 'Pesho';
        const update = () => {
            return Promise.resolve();
        };

        sinon.stub(db, 'course')
            .callsFake(() => {
                return { update };
            });

        data.then(function (d) {
            return d.pushLikedUser(title, lecturer, user)
                .then((col) => {
                    expect(col).to.be.equal(null);
                })
                .catch(function () {
                    console.log('Error');
                });
        })
            .catch((err) => {
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

        db.collection.restore();

        sinon.stub(db, 'collection')
            .callsFake(() => {
                return { update };
            });

        data.then(function (d) {
            return d.pullLikedUser(title, lecturer, user)
                .then((col) => {
                    expect(col).to.be.equal(courses);
                });
        })
            .catch((err) => {

            });
    });

    it('Push enrolled courses', () => {
        const course = 'JS';
        const courseId = 1;
        const userId = 2;
        findOne = () => {
            return Promise.resolve(courses[0]);
        };

        db.collection.restore();
        sinon.stub(db, 'collection')
            .callsFake(() => {
                return { findOne };
            });
        data.then(function (d) {
            return d.pushEnrolledCourse(courseId, userId)
                .then((foundCourse) => {
                    expect(foundCourse).to.be.equal(course);
                });
        })
            .catch((err) => {
            });
    });
});
