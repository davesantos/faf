var theTime = Math.round(new Date().getTime() / 1000);
var gulp = require('gulp'),
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

function errorHandler(error) {
	console.error(String(error));
	this.emit('end');
	gutil.beep();
}

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

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
	gulp.watch( paths.sass + '/*', ['build']);
	gulp.watch('./js/*.js', ['build']);
	gulp.watch('./tumblr.html', ['build']);
	// gulp.watch('./tumblr.html').on('change', livereload.changed);
})

gulp.task('default', ['build', 'watch'])