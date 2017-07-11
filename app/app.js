/* globals __dirname */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const init = (db) => {
    const app = express();

    app.set('view engine', 'pug');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({
        secret: 'the camp alpha',
        resave: false,
        saveUninitiallized: true
    }));

    const AuthStrategy = new LocalStrategy((username, password, done) => {
        db.collection('users').find({ username: username })
            .then(user => {
                if (user && (user.password === password)) {
                    done(null, user);
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
            .find({_id: userId})
            .then(user => done(null, user || false))
            .catch(error => done(error, false));
    });

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/static', express.static(path.join(__dirname, '../public/')));
    app.use('/libs', express.static(path.join(__dirname, '../node_modules/')));

    require('./routers')
        .attachTo(app, db);

    return Promise.resolve(app);
};

module.exports = { init };