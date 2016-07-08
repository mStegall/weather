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
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');

var config = {
    includePaths: ['./bower_components/bootstrap-sass/assets/stylesheets', './bower_components/bootswatch/flatly']
};

var folders = {

}


// Installs Bower dependecies
gulp.task('bower', function () {
    return bower();
})

// Compiles Pug templates, removes whitespace in production 
gulp.task('pug', function () {
    return gulp.src('./src/**/*.pug')
        .pipe(gulpif(argv.p, pug(), 
        pug({
            pretty: true
        })))
        .pipe(gulp.dest('./public/'))
})

// Compiles Sass files to css, compresses in production
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

// Uglifies JS files in production
gulp.task('js', function () {
    return gulp.src('./src/**/*.js')
        .pipe(gulpif(argv.p, uglify()))
        .pipe(gulp.dest('./public/'))
})

// Optimize Images
gulp.task('img', function () {
    return gulp.src(['./src/**/*.jpg', './src/**/*.png', './src/**/*.gif'])
        .pipe(imagemin([imageminPngquant(), imagemin.gifsicle(), imagemin.jpegtran({progressive: true})]))
        .pipe(gulp.dest('./public/'))
})

gulp.task('assets', function () {
    return gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./public/assets/'))
})

// Clear the build directory
gulp.task('clean', function () {
    return gulp.src('./public/', { read: false })
        .pipe(clean());
})

gulp.task('build', function () {
    runSequence(['clean', 'bower'],
        'assets',
        ['pug', 'sass', 'js', 'img'])
})

gulp.task('default', ['build'])