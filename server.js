const async = () => {
    return Promise.resolve();
};

const { config } = require('./app/config');

async()
.then(() => require('./db').init(config.connectionString))
    .then((db) => require('./app').init(db))
    .then((app) => {
        app.listen(config.port, () => console.log(`Server running at localhost:${config.port}`));
    });