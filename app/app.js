const express = require('express');
const bodyParser = require('body-parser');

const init = (db) => {
    const app = express();

    app.set('view engine', 'pug');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/static', express.static('../public'));
    app.use('/libs', express.static(('../node_modules')));

    app.get("/", (request, response) => {
        response.render('layout');
    });

    app.get("/about", (request, response) => {
        response.render('about');
    });

    return Promise.resolve(app);
};

module.exports = { init };