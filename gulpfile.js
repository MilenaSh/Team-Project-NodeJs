const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');


const { config } = require('./app/config');

// TODO
// scripts task - still not working etirely

// gulp.task('scripts', function() {
//     gulp.src(['public/scripts/**/*.js', '!public/scripts/**/*.min.js'])
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(uglify())
//         .pipe(gulp.dest('public/scripts'));
// });

gulp.task('scripts', function() {
    gulp.src(['public/scripts/login.js', '!public/scripts/**/*.min.js'])
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

gulp.task('default', ['scripts']);