var theTime = Math.round(new Date().getTime() / 1000);
var gulp = require('gulp'),
<<<<<<< HEAD
 	changed = require('gulp-changed'),
 	compass = require('gulp-compass'),
 	gutil = require('gulp-util'),
 	rename = require('gulp-rename'),
 	inlinesource = require('gulp-inline-source');
=======
  changed = require('gulp-changed'),
  compass = require('gulp-compass'),
  del = require('del'),
  gutil = require('gulp-util'),
  inlinesource = require('gulp-inline-source'),
  rename = require('gulp-rename');

var paths = {
  dest: 'build',
  sass: '_sass',
  css: 'css'
};
>>>>>>> basic

var paths = {
	dest: 'deploy'
};

function errorHandler(error) {
	console.error(String(error));
	this.emit('end');
	gutil.beep();
}

<<<<<<< HEAD
=======
gulp.task('clean', function(cb) {
  del(['build'], cb);
});

>>>>>>> basic
gulp.task('compass', function(){
	return gulp.src(paths.sass + '/*.{sass,scss}')
		.pipe(compass({
			config_file: './config.rb',
			css: paths.css,
			sass: paths.sass, //Must not have .
			require: ['susy'] }))
		.on('error', errorHandler)
		.pipe(gulp.dest('./css'))
});

<<<<<<< HEAD
gulp.task('inline', ['compass'], function () {
=======
gulp.task('build', ['compass'], function () {
>>>>>>> basic
	var options = {
	    compress: false
	};
  return gulp.src('tumblr.html')
      .pipe(inlinesource(options))
      .pipe(rename({
<<<<<<< HEAD
          suffix: "-build",
          extname: ".html"
      }))
      .pipe(gulp.dest(paths.dest));
=======
          suffix: "-" + theTime,
          extname: ".html"
      }))
      .pipe(gulp.dest(paths.dest));
      gutil.log(gutil.colors.green('BUILD COMPLETE'));
>>>>>>> basic
      gutil.beep();
});

gulp.task('build', ['compass','inline'], function(){
	gutil.log(gutil.colors.green('BUILD COMPLETE'));
})

gulp.task('watch', function(){
<<<<<<< HEAD
	gulp.watch('./_sass/*', ['inline']);
	gulp.watch('./js/*.js', ['inline']);
	gulp.watch('./tumblr.html', ['inline']);
=======
	gulp.watch( paths.sass + '/*', ['build']);
	gulp.watch('./js/*.js', ['build']);
	gulp.watch('./tumblr.html', ['build']);
>>>>>>> basic
	// gulp.watch('./tumblr.html').on('change', livereload.changed);
})

gulp.task('default', ['build', 'watch'])
