var gulp = require('gulp'),
  changed = require('gulp-changed'),
  compass = require('gulp-compass'),
  del = require('del'),
  gutil = require('gulp-util'),
  inlinesource = require('gulp-inline-source'),
  rename = require('gulp-rename');

var paths = {
	dest: 'build'
};
var theTime = new Date().getTime();


function errorHandler(error) {
	console.error(String(error));
	this.emit('end');
	gutil.beep();
}

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('compass', function(){
	return gulp.src('./_sass/*.{sass,scss}')
		.pipe(compass({
			config_file: './config.rb',
			css: './css',
			sass: '_sass', //Must not have .
			require: ['susy'] }))
		.on('error', errorHandler)
		.pipe(gulp.dest('./css'))
});

gulp.task('build', ['compass'], function () {
	var options = {
	    compress: false
	};
  return gulp.src('tumblr.html')
      .pipe(inlinesource(options))
      .pipe(rename({
          suffix: "-" + theTime,
          extname: ".html"
      }))
      .pipe(gulp.dest(paths.dest));
      gutil.log(gutil.colors.green('BUILD COMPLETE'));
      gutil.beep();
});

gulp.task('watch', function(){
	gulp.watch('./_sass/*', ['build']);
	gulp.watch('./js/*.js', ['build']);
	gulp.watch('./tumblr.html', ['build']);
	// gulp.watch('./tumblr.html').on('change', livereload.changed);
})

gulp.task('default', ['build', 'watch'])