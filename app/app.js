const express = require('express');
const bodyParser = require('body-parser');

const init = (db) => {

    const app = express();

    app.set('view engine', 'pug');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/static', express.static('../public'));
    app.use('/libs', express.static(('../node_modules')));

    return app;
};

module.exports = { init };

