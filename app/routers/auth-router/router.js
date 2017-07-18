const attachTo = (app, db, passport) => {
    const controller = require('./controller').init(db, passport);

    app.post('/auth/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/',
        session: true,
    }));

    app.post('/auth/register', controller.register);

    app.get('/auth/logout', controller.logout);
};

module.exports = { attachTo };