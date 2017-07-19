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

    const data = {
        db,
        getCourses,
        getCourseById,
        pushLikedUser,
    };

    return Promise.resolve(data);
};

module.exports = { init };
