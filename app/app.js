/* globals __dirname */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const init = (db) => {
    const app = express();

    app.set('view engine', 'pug');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/static', express.static(path.join(__dirname, '../public/')));
    app.use('/libs', express.static(path.join(__dirname, '../node_modules/')));

    require('./routers')
        .attachTo(app, db);

    return Promise.resolve(app);
};

module.exports = { init };