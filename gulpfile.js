const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');


const { config } = require('./app/config');
const { MongoClient } = require('mongodb');

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
            './db/**/*.js',
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


const configTest = {
    connectionString: 'mongodb://milena:123456@ds129352.mlab.com:29352/watchmen-db-test',
    port: 3002,
};

gulp.task('test-server:start', () => {
    return Promise.resolve()
        .then(() => require('./db').init(configTest.connectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
            app.listen(
                config.port,
                () => console.log(`Magic happends at :${configTest.port}`));
        });
});


gulp.task('test-server:stop', () => {
    return MongoClient.connect(configTest.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

// browser tests

gulp.task('tests:browser', ['test-server:start'], () => {
    return gulp.src('./tests/browser/home.js')
        .pipe(mocha({
            reporter: 'spec',
            timeout: 10000,
        }))
        .once('end', () => {
            gulp.start('test-server:stop');
        });
});


