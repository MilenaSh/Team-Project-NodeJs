const attachTo = (app, db, passport, data) => {
    const controller = require('./controller').init(db, data);

    app.get('/', controller.getHome);

    app.get('/login', controller.getLoginPage);

    app.get('/register', controller.getRegisterPage);

    app.get('/profile', controller.getProfilePage);
};

module.exports = { attachTo };
