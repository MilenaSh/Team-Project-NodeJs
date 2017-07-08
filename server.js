const asyc = () => {
    return Promise.resolve();
};

const config = require('./app/config');

async()
.then(() => require('./db').init(config.connectionString))
    .then((db) => require('./app').init(db))
    // .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(config.port, () => console.log(`Server runnit at localhost:${config.port}`));
    });