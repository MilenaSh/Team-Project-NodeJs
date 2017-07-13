const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');


const { config } = require('./app/config');


// scripts task

gulp.task('scripts', function() {
    gulp.src(['public/scripts/main.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('public/scripts'));
});


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

// default task

gulp.task('default', ['start-server', 'scripts']);