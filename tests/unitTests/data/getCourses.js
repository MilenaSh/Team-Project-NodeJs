const { expect } = require('chai');
const sinon = require('sinon');

const { init } = require('../../../data');

describe('Get data for the courses', () => {
    let courses = [];
    let data = null;
    const db = {
        collection: () => { },
    };

    const toArray = () => {
        return Promise.resolve(courses);
    };

    const find = (param) => {
        console.log(param);
        return {
            toArray,
        };
    };

    beforeEach(() => {
        courses = [
            {
                id: 1,
                title: 'Java',
                lecturer: 'Doncho',
            },
            {
                id: 2,
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
    // it('expect to return courses', () => {
    //     return ((collection) => {
    //         expect(collection).to.equal(courses);
    //     });
    // });

    it('Get courses', () => {
        data.then(function(d) {
            return d.getCourses();
        })
            .then((coursesCollection) => {
                expect(coursesCollection).to.be.equal(courses);
            });
    });

    it('Get course by Id', () => {
        const id = 2;
        data.then(function(d) {
            return d.getCourseById(id);
        }).then((courseArray) => {
            console.log(courseArray.length)
            expect(courseArray.length).to.equal(12);
            expect(courseArray[0].title).to.equal('C++');
        });
    });

    // it('Push liked user', () => {
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

    //     sinon.stub(db, 'course')
    //         .callsFake(() => {
    //             return { update };
    //         });

    //     data.then(function(d) {
    //         return d.pushLikedUser(title, lecturer, user)
    //             .then((col) => {
    //                 expect(col).to.be.equal(courses);
    //             })
    //             .catch(function() {
    //                 console.log('Error');
    //             });
    //     });
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

    //     // const coursesCollection = ['JS'];
    //     // update = coursesCollection.update.bind(coursesCollection);

    //     data.then(function(d) {
    //         return d.pullLikedUser(title, lecturer, user)
    //             .then((col) => {
    //                 expect(col).to.be.equal(courses);
    //             });
    //     });
    // });

    // it('Push enrolled courses', () => {
    //     const course = 'JS';
    //     const courseId = 1;
    //     const userId = 2;
    //     const findOne = () => {
    //         return {
    //             courseId,
    //         };
    //     };

    //     sinon.stub(db, 'coursesCollection')
    //         .callsFake(() => {
    //             return { findOne };
    //         });
    //     data = init(db);
    //     data.then(function(d) {
    //         return d.pushEnrolledCourse(courseId, userId)
    //             .then((foundCourse) => {
    //                 expect(foundCourse).to.be.equal(course);
    //             });
    //     });
    // });
});
