var gulp = require('gulp');
var argv = require('yargs').argv;

var pug = require('gulp-pug');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var bower = require('gulp-bower');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');

var config = {
    includePaths: ['./src/assets/lib/bootstrap-sass/assets/stylesheets', './src/assets/lib/bootswatch/flatly']
};

gulp.task('bower', function () {
    return bower();
})

gulp.task('pug', function () {
    return gulp.src('./src/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./public/'))
})

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
        .pipe(gulpif(argv.p, sass({
            includePaths: config.includePaths,
            outputStyle: 'compressed'
        }),
        sass({
            includePaths: config.includePaths
        })))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/'))
})

gulp.task('js', function () {
    return gulp.src(['./src/**/*.js', '!./src/assets/lib/**/*.js'])
        .pipe(gulpif(argv.p, uglify()))
        .pipe(gulp.dest('./public/'))
})

gulp.task('assets', function () {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./public/assets/'))
})

gulp.task('clean', function () {
    return gulp.src('./public/', { read: false })
        .pipe(clean());
})

gulp.task('build', function () {
    runSequence(['clean', 'bower'],
        ['pug', 'sass', 'js'],
        'assets')
})

gulp.task('default', ['build'])