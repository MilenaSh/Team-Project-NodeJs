const attachTo = (app, db) => {
    const controller = require('./controller').init(db);

    app.get('/courses/:id', controller.getCourseById);

    app.get('/courses', controller.getCourses);
};

module.exports = { attachTo };