const attachTo = (app, db, passport) => {
    const controller = require('./controller').init(db, passport);

    app.post('/auth/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/',
        session: true,
    }));

    app.post('/auth/register', passport.authenticate('signup', {
        failureRedirect: '/register',
        successRedirect: '/',
    }));

    app.get('/auth/logout', controller.logout);
};

module.exports = { attachTo };
