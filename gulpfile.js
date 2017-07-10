const gulp = require('gulp');

const { config } = require('./app/config');

gulp.task('start-server', () => {
    return Promise.resolve()
        .then(() => require('./db').init(config.connectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
            app.listen(
                config.port,
                () => console.log(`Server running at localhost:${config.port}`));
        });
});