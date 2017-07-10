const attachTo = (app, db) => {
    const controller = require('./controller').init(db);

    app.get('/courses/:id', controller.getCourseById)
};

module.exports = { attachTo };