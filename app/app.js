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

    const passport = require('./passport').passportSetUp(app, db);

    app.use('/static', express.static(path.join(__dirname, '../public/')));
    app.use('/libs', express.static(path.join(__dirname, '../node_modules/')));

    require('./routers')
        .attachTo(app, db, passport);

    return Promise.resolve(app);
};

module.exports = { init };