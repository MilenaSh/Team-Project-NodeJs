const { Router } = require('express');

const getHomeRouter = (db) => {
    const router = new Router();
    router
        .get('/', (request, response) => {
            response.render('home');
        })
        .get('/about', (request, response) => {
            const coursesPromise = db.collection('courses')
                .find()
                .toArray();
            coursesPromise.then((value) => {
                response.render('about', {
                    courses: value
                });
            });
        });
    return router;
};

module.exports = { getHomeRouter };