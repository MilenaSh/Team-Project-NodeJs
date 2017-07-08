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

    app.get('/', (request, response) => {
        response.render('layout');
    });

    app.get('about', (request, response) => {
        response.render('about');
    });

    return Promise.resolve(app);
};

module.exports = { init };

