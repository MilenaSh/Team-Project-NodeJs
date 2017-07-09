const attachTo = (app, db) => {
    const controller = require('./controller').init(db);

    app.get('/items', (req, res) => {
        // auth
        return controller.getAll(req, res);
    });

    app.get('/items/form', (req, res) => {
        return res.render('items/form');
    });

    app.post('/items', (req, res) => {
        const item = req.body;

        // validate item
        return data.items.create(item)
            .then((dbItem) => {
                return res.redirect('/items');
            })
            .catch((err) => {
                // connect-flash
                req.flash('error', err);
                return res.redirect('/items/form');
            });
    });
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