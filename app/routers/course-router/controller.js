const init = (db, data) => {
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

            data.getCourses(filter)
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

            data.pullLikedUser(title, lecturer, user);
        },

        enrollCourse(request, response) {
            const userID = request.user[0]._id;
            const courseID = request.body.courseID;

            data.pushEnrolledCourse(courseID, userID);

            response.status(200).redirect('/courses/' + courseID);
        },

        disEnrollCourse(request, response) {
            const userID = request.user[0]._id;
            const courseID = request.body.courseID;

            data.pullEnrolledCourse(courseID, userID);

            response.status(200).redirect('/courses/' + courseID);
        },
    };
    return controller;
};


module.exports = { init };
