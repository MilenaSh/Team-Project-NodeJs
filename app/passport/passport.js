const objectId = require('mongodb').ObjectID;
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
const userValidator = require('./userValidator');

// Generates hash using bCrypt
const createHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds), null);
};

const passportSetUp = (app, db) => {
    app.use(session({
        secret: 'the camp alpha',
        resave: true,
        saveUninitiallized: true,
    }));

    const AuthStrategy = new LocalStrategy({
            passReqToCallback: true,
        },
        (request, username, password, done) => {
            db.collection('users')
                .find({ username: username })
                .toArray()
                .then((user) => {
                    if (user.length > 0 &&
                        bcrypt.compareSync(password, user[0].password)) {
                        done(null, user[0]);
                    } else {
                        done(null, false,
                            request.flash('error',
                                'Username or password is incorrect!'));
                    }
                })
                .catch((error) => done(error, false));
        });

    const RegistrationStrategy = new LocalStrategy({
            passReqToCallback: true,
        },
        (request, username, password, done) => {
            db.collection('users')
                .findOne({ username: username })
                .then((user) => {
                    if (user) {
                        console.log('User already exists');
                        done(null, false,
                            request.flash('error', 'Test'));
                    } else {
                        // userValidator.validateUser(user, console.log('test'));
                        const newUser = {
                            fullname: request.body.fullname,
                            username: username,
                            avatarUrl: '',
                            password: createHash(password),
                            enrolledCourses: [],
                            city: '',
                            street: '',
                            website: '',
                        };
                        db.collection('users').insert(newUser);
                        console.log('User registration successful');
                        done(null, newUser);
                    }
                })
                .catch((error) => done(error, false));
        });

    passport.use(AuthStrategy);

    passport.use('signup', RegistrationStrategy);

    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser((userId, done) => {
        db.collection('users')
            .find({ _id: objectId(userId) })
            .toArray()
            .then((user) => done(null, user || false))
            .catch((error) => done(error, false));
    });

    app.use(passport.initialize());
    app.use(passport.session());

    // add Promise.resolve if needed
    return passport;
};

module.exports = { passportSetUp };