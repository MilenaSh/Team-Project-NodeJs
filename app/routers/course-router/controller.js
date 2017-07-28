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

            const page = request.query.page;
            const COURSES_PER_PAGE = 12;

            data.getCourses(filter)
                .then((courses) => {
                    const pageLimits = {
                        low: 1,
                        high: Math.ceil(courses.length / 12),
                    };
                    if (page < pageLimits.low || page > pageLimits.high) {
                        if (courses.length !== 0) {
                            return response.redirect('/404');
                        }
                    }
                    courses = courses
                        .slice((page - 1) * COURSES_PER_PAGE,
                        COURSES_PER_PAGE * page);
                    return response.render('courses', {
                        courses: courses,
                        isLoggedIn: request.isAuthenticated(),
                        user: request.user,
                        pageLimits: pageLimits,
                        page,
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

        getLectures(request, response) {
            const id = request.params.id;
            const user = request.user;

            data.getCourseById(id)
                .then((value) => {
                    response.render('lectures', {
                        user: user,
                        course: value,
                        isLoggedIn: request.isAuthenticated(),
                    });
                });
        },

        getCurrentLecture(request, response) {
            const courseID = request.params.id;
            const lectureNumber = request.params.number;
            const user = request.user;

            data.getLectureByNumber(courseID, lectureNumber)
                .then((details) => {
                    return response.render('selected-lecture', {
                        lecture: details.lecture,
                        course: details.course,
                        user: user,
                        isLoggedIn: request.isAuthenticated(),
                    });
                });
        },
    };
    return controller;
};


module.exports = { init };
