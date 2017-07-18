const init = (db) => {
    const objectId = require('mongodb').ObjectID;
    const controller = {
        getCourseById(request, response) {
            const id = request.params.id;

            const selectedCoursePromise = db.collection('courses')
                .find({ '_id': objectId(id) })
                .toArray();

            selectedCoursePromise
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
            const coursesPromise = db.collection('courses')
                .find(filter)
                .toArray();
            coursesPromise.then((value) => {
                return response.render('courses', {
                    courses: value,
                    isLoggedIn: request.isAuthenticated(),
                    user: request.user,
                });
            });
        },
        likeCourse(request, response) {
            // let id = request.user[0]._id;

            const user = request.user[0];
            delete user.enrolledCourses;

            // id = String(id);
            const title = request.body.title;
            const lecturer = request.body.lecturer;

            // db.collection('courses')
            //     .update({
            //         lecturer: lecturer,
            //         title: title,
            //     }, {
            //         $push: {
            //             likeByUserId: id,
            //         },
            //     });

            db.collection('courses')
                .update({
                    lecturer: lecturer,
                    title: title,
                }, {
                    $push: {
                        usersLiked: user,
                    },
                });
        },

        unlikeCourse(request, response) {
            const user = request.user[0];

            // let id = request.user[0]._id;
            delete user.enrolledCourses;

            // id = String(id);
            const title = request.body.title;
            const lecturer = request.body.lecturer;

            // db.collection('courses')
            //     .update({
            //         lecturer: lecturer,
            //         title: title,
            //     }, {
            //         $pull: {
            //             likeByUserId: id,
            //         },
            //     });

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

            // db.collection('users')
            //     .update({
            //         _id: userID,
            //     }, {
            //         $push: {
            //             enrolledCourseIDs: courseID,
            //         },
            //     });

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

            // db.collection('users')
            //     .update({
            //         _id: userID,
            //     }, {
            //         $pull: {
            //             enrolledCourseIDs: courseID,
            //         },
            //     });

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
