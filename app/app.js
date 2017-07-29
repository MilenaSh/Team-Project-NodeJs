/* globals __dirname */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const multer = require('multer');
const ObjectId = require('mongodb').ObjectID;
// const http = require('http');
const users = [];
const connections = [];


const app = express();

const init = (data) => {
    const db = data.db;

    app.set('view engine', 'pug');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(flash());
    // app.use(multer({
    //     dest: '/public/images/uploads/',
    //     rename: function(fieldname, filename) {
    //         return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
    //     },
    // }));


    // add .then if needed
    const passport = require('./passport').passportSetUp(app, db);

    app.use('/static', express.static(path.join(__dirname, '../public/')));
    app.use('/libs', express.static(path.join(__dirname, '../node_modules/')));

    require('./routers')
        .attachTo(app, db, passport, data);

    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    io.sockets.on('connection', function(socket) {
        connections.push(socket);
        console.log('Connected: %s sockets connected', connections.length);

        // Disconnecting the sockets
        socket.on('disconnect', function(someData) {
            connections.splice(connections.indexOf(socket), 1);
            console.log('Disconnected: %s sockets connected',
                connections.length);
        });

        // Send message
        socket.on('send message', function(someData) {
            console.log(someData);
            io.sockets.emit('new message', { msg: someData });
        });

        // New User

        // socket.on('new user', function(data, callback) {
        //     callback(true);
        //     socet.username = data
        // })

        // function updateUsernames() {
        //     io.sockets.emit('get users', usernames);
        // }
    });

    return Promise.resolve(server);
};

module.exports = { init };