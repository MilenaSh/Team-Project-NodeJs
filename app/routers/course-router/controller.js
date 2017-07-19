const init = (db, data) => {
    const objectId = require('mongodb').ObjectID;
    const controller = {
        getCourseById(request, response) {
            const id = request.params.id;

            data.getCourseById(id)
                .then((value) => {
                    response.render('selected-course', {
                        course: value,
                        isLoggedIn: request.isAuthenticated(),
                        user: request.user,
                    });
                });
        },
        getCourses(request, response) {
            const filter = {
                'title': { $regex: new RegExp(request.query.title, 'i') },
            };

            data.getCourses()
                .then((courses) => {
                    return response.render('courses', {
                        courses: courses,
                        isLoggedIn: request.isAuthenticated(),
                        user: request.user,
                    });
                });
        },
        likeCourse(request, response) {
            const user = request.user[0];
            delete user.enrolledCourses;

            const title = request.body.title;
            const lecturer = request.body.lecturer;

            data.pushLikedUser(title, lecturer, user);
        },

        unlikeCourse(request, response) {
            const user = request.user[0];

            delete user.enrolledCourses;

            const title = request.body.title;
            const lecturer = request.body.lecturer;

            db.collection('courses')
                .update({
                    lecturer: lecturer,
                    title: title,
                }, {
                    $pull: {
                        usersLiked: user,
                    },
                });
        },

        enrollCourse(request, response) {
            const userID = objectId(request.user[0]._id);
            const courseID = objectId(request.body.courseID);

            db.collection('courses')
                .findOne({
                    _id: courseID,
                })
                .then((course) => {
                    delete course.usersLiked;
                    db.collection('users')
                        .update({
                            _id: userID,
                        }, {
                            $push: {
                                enrolledCourses: course,
                            },
                        });
                });

            response.status(200).redirect('/courses/' + courseID);
        },

        disEnrollCourse(request, response) {
            const userID = objectId(request.user[0]._id);
            const courseID = objectId(request.body.courseID);

            db.collection('courses')
                .findOne({
                    _id: courseID,
                })
                .then((course) => {
                    delete course.usersLiked;
                    db.collection('users')
                        .update({
                            _id: userID,
                        }, {
                            $pull: {
                                enrolledCourses: course,
                            },
                        });
                });
            response.status(200).redirect('/courses/' + courseID);
        },
    };
    return controller;
};


module.exports = { init };
