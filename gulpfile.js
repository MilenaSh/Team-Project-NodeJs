const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');


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
        .pipe(plumber())
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

gulp.task('pre-test', () => {
    return gulp.src([
            './app/**/*.js',
            './data/**/*.js',
            '!./app/app.js',
            '!./app/index.js',
            '!./app/config**/*.js',
            '!./app/passport**/*.js',
            '!./app/routers/auth-router**/*.js',
            '!./app/routers/index.js',
            '!./app/routers/routers.js',
        ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src('./tests/unitTests/**/*.js')
        .pipe(mocha({
            reporter: 'spec',
            // reporter: 'landing'
        }))
        .pipe(istanbul.writeReports());
});

// default task

gulp.task('default', ['scripts']);