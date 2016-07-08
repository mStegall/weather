var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

gulp.task('pug', function () {
    return gulp.src('./src/**/*.pug')
            .pipe(pug())
            .pipe(gulp.dest('./public/'))
})

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
            .pipe(sass({
                includePaths: ['./src/assets/lib/bootstrap-sass/assets/stylesheets', './src/assets/lib/bootswatch/flatly']
            }))
            .pipe(gulp.dest('./public/'))
})

gulp.task('assets', function () {
    return gulp.src('./src/assets/*')
            .pipe(gulp.dest('./public/assets/'))
})

gulp.task('clean', function () {
    return gulp.src('./public/', {read: false})
            .pipe(clean()); 
})

gulp.task('build', function () {
    runSequence('clean',
                ['pug','sass','assets'])
})

gulp.task('default', ['build'])