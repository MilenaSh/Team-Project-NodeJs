const passport = require('passport');

// get user data
//const data = require('../../data');

module.exports = (app, data) => {
    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user.id);
        }
    });

    passport.deserializeUser((userId, done) => {
        data
            .findById(userId)
            .then((user) => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(error => done(error, false));
    });

    require('./local-strategy')(passport, data);

    app.use(passport.initialize());
    app.use(passport.session());
};