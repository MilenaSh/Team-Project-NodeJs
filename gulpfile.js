const gulp = require('gulp');

<<<<<<< HEAD
gulp.task('task-name', function() {
    console.log('Test success!');
=======
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
>>>>>>> c221db561cf8b551f6c6ed08115c0e565ffd5ffb
});