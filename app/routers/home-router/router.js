const attachTo = (app, db, passport) => {
    const controller = require('./controller').init(db, passport);

    app.get('/', controller.getHome);

    app.get('/login', controller.getLoginPage);

    app.post('/login', passport.authenticate('local', {
                failureRedirect: '/login',
                successRedirect: '/',
                session: true
            }));

    app.get('/register', controller.getRegisterPage);

    app.post('/register', controller.postRegisterPage);

    app.get('/profile', controller.getProfilePage);
};

module.exports = { attachTo };



// const { Router } = require('express');

// const getHomeRouter = (db) => {
//     const router = new Router();
//     router
//         .get('/', (request, response) => {
//             response.render('home');
//         })
//         .get('/about', (request, response) => {
//             const coursesPromise = db.collection('courses')
//                 .find()
//                 .toArray();
//             coursesPromise.then((value) => {
//                 response.render('about', {
//                     courses: value
//                 });
//             });
//         });
//     return router;
// };

// module.exports = { getHomeRouter };