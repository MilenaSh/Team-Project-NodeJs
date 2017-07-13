/* globals __dirname */

const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser');

const appConfig = (app) => {
    app.set('view engine', 'pug');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cookieParser());
    app.use(session({ secret: 'secret session' }));

    // app.use('/libs',
    //     express.static(path.join(__dirname, '../../../node_modules')));
    app.use('/public', express.static(path.join(__dirname, '../../../public')));
};

module.exports = appConfig;