var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

gulp.task('sass', function() {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename('styles.scss.liquid'))
        .pipe(replace('"{{', '{{'))
        .pipe(replace('}}"', '}}'))
        .pipe(gulp.dest('./assets/'));
});

gulp.task('default', function() {
    gulp.watch(['./sass/**/*.scss'], ['sass']);
});