/* globals __dirname */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
//const session = require('express-session');
const passport = require('passport');
//const LocalStrategy = require('passport-local');
const ObjectId = require('mongodb').ObjectID;

const init = (db) => {
    const app = express();

    app.set('view engine', 'pug');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    // app.use(session({
    //     secret: 'the camp alpha',
    //     resave: true,
    //     saveUninitiallized: true,
    // }));

    const passport = require('./passport').passportSetUp(app, db);

    // const AuthStrategy = new LocalStrategy((username, password, done) => {
    //     db.collection('users')
    //         .find({ username: username })
    //         .toArray()
    //         .then((user) => {
    //             if (user.length > 0 && (user[0].password === password)) {
    //                 done(null, user[0]);
    //             } else {
    //                 done(null, false);
    //             }
    //         })
    //         .catch(error => done(error, false));
    // });

    // passport.use(AuthStrategy);

    // passport.serializeUser((user, done) => {
    //     if (user) {
    //         done(null, user._id);
    //     }
    // });

    // passport.deserializeUser((userId, done) => {
    //     db.collection('users')
    //         .find({ _id: ObjectId(userId) })
    //         .toArray()
    //         .then(user => done(null, user || false))
    //         .catch(error => done(error, false));
    // });

    // app.use(passport.initialize());
    // app.use(passport.session());

    app.use('/static', express.static(path.join(__dirname, '../public/')));
    app.use('/libs', express.static(path.join(__dirname, '../node_modules/')));

    require('./routers')
        .attachTo(app, db, passport);

    return Promise.resolve(app);
};

module.exports = { init };