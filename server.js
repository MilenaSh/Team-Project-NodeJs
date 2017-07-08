const async = () => {
    return Promise.resolve();
};

const { config } = require('./app/config');

// async()
//     .then(() => {
//         require('./db').init(config.connectionString);
//     })
//     .then((db) => {
//         console.log(db);
//         const app = require('./app').init(db);
//         return Promise.resolve(app);
//     })
//     .then((app) => {
//         app.listen(config.port, () => console.log(`Server running at localhost:${config.port}`));
//     });


async()
    .then(() => require('./db').init(config.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(config.port, () => console.log(`Server running at localhost:${config.port}`));
    });