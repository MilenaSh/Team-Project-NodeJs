const ObjectId = require('mongodb').ObjectID;
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const passportSetUp = (app, db) => {

    app.use(session({
        secret: 'the camp alpha',
        resave: true,
        saveUninitiallized: true,
    }));

    const AuthStrategy = new LocalStrategy((username, password, done) => {
        db.collection('users')
            .find({ username: username })
            .toArray()
            .then((user) => {
                if (user.length > 0 && (user[0].password === password)) {
                    done(null, user[0]);
                } else {
                    done(null, false);
                }
            })
            .catch(error => done(error, false));
    });

    passport.use(AuthStrategy);

    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser((userId, done) => {
        db.collection('users')
            .find({ _id: ObjectId(userId) })
            .toArray()
            .then(user => done(null, user || false))
            .catch(error => done(error, false));
    });

    app.use(passport.initialize());
    app.use(passport.session());

    // add Promise.resolve if needed
    return passport;
};

module.exports = { passportSetUp };
