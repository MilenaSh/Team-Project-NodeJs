const attachTo = (app, db, passport, data) => {
    const controller = require('./controller').init(db, data);

    app.post('/courses/enroll', controller.enrollCourse);

    app.post('/courses/disenroll', controller.disEnrollCourse);

    app.get('/courses/:id', controller.getCourseById);

    app.get('/courses', controller.getCourses);

    app.post('/courses/like', controller.likeCourse);

    app.post('/courses/unlike', controller.unlikeCourse);
};

module.exports = { attachTo };
