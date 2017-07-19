const async = () => {
    return Promise.resolve();
};

const { config } = require('./app/config');

async()
.then(() => require('./db').init(config.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
<<<<<<< HEAD
        app.listen(config.port, () =>
            console.log(`Server running at localhost:${config.port}`));
    });
=======
        app.listen(config.port, () => {
            console.log(`Server running at localhost:${config.port}`);
        });
    });
>>>>>>> 878cab799db55c71f89b8cc7cba8d750352deed3
