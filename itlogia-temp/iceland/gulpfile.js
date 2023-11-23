const gulp = require("gulp");
const less = require('gulp-less');
const path = require('path');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

exports.less = function () {

    return gulp.src('./src/styles/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./styles'));
}

exports.default = less;

exports.watch =function () {
    gulp.watch('./src/styles/*.less', gulp.series('less'));
}