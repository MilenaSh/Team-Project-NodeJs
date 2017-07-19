const init = (db) => {
    const objectId = require('mongodb').ObjectID;

    const usersCollection = db.collection('users');
    const coursesCollection = db.collection('courses');

    const getCourses = (filter) => {
        return coursesCollection
            .find(filter)
            .toArray()
            .then((courses) => {
                return Promise.resolve(courses);
            });
    };

    const getCourseById = (id) => {
        return coursesCollection
            .find({ '_id': objectId(id) })
            .toArray()
            .then((value) => {
                return Promise.resolve(value);
            });
    };

    const pushLikedUser = (title, lecturer, user) => {
        return coursesCollection
            .update({
                title: title,
                lecturer: lecturer,
            }, {
                $push: {
                    usersLiked: user,
                },
            });
    };

    const pullLikedUser = (title, lecturer, user) => {
        return coursesCollection
            .update({
                title: title,
                lecturer: lecturer,
            }, {
                $pull: {
                    usersLiked: user,
                },
            });
    };

    const pushEnrolledCourse = (courseID, userID) => {
        return coursesCollection
            .findOne({
                _id: objectId(courseID),
            })
            .then((course) => {
                delete course.usersLiked;
                usersCollection
                    .update({
                        _id: objectId(userID),
                    }, {
                        $push: {
                            enrolledCourses: course,
                        },
                    });
            });
    };

    const pullEnrolledCourse = (courseID, userID) => {
        return coursesCollection
            .findOne({
                _id: objectId(courseID),
            })
            .then((course) => {
                delete course.usersLiked;
                usersCollection
                    .update({
                        _id: objectId(userID),
                    }, {
                        $pull: {
                            enrolledCourses: course,
                        },
                    });
            });
    };

    const data = {
        db,
        getCourses,
        getCourseById,
        pushLikedUser,
        pullLikedUser,
        pushEnrolledCourse,
        pullEnrolledCourse,
    };

    return Promise.resolve(data);
};

module.exports = { init };
