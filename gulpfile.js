var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var coffee = require('gulp-coffee');
var plumber = require('gulp-plumber');

gulp.task('default', ['compile']);
gulp.task('compile', ['sass', 'coffee']);

gulp.task('watch', function () {
	gulp.watch('public/stylesheets/*', ['sass']);
	gulp.watch('public/scripts/*', ['coffee']);
});

gulp.task('sass', function() {
	return gulp.src('public/stylesheets/style.scss')
		.pipe(plumber())
		.pipe(sass().on('error', gutil.log))
		.pipe(gulp.dest('public/stylesheets'))
});

gulp.task('coffee', function() {
	return gulp.src('public/scripts/script.coffee')
		.pipe(plumber())
		.pipe(coffee({bare:true}).on('error', gutil.log))
		.pipe(gulp.dest('public/scripts'));
});
