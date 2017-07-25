const attachTo = (app, db, passport, data) => {
    const controller = require('./controller').init(db, data);

    app.get('/', controller.getHome);

    app.get('/login', controller.getLoginPage);

    app.get('/register', controller.getRegisterPage);

    app.get('/profile', controller.getProfilePage);

    app.get('/contact', controller.getContactPage);

    app.get('/about', controller.getAboutPage);

    app.put('/profile', controller.updateProfile);
};

module.exports = { attachTo };