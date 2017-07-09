const LocalStrategy = require('passport-local')

module.exports = (passport, data) => {
    const authStrategy = new LocalStrategy((username, password, done) => {
        data.findByUsername(username)
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(error => done(error, false));
    });

    passport.use(authStrategy);
};