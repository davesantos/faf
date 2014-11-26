var gulp = require('gulp'),
 	changed = require('gulp-changed'),
 	compass = require('gulp-compass'),
 	gutil = require('gulp-util'),
 	rename = require('gulp-rename'),
 	inlinesource = require('gulp-inline-source');

var paths = {
	dest: 'deploy'
};

function errorHandler(error) {
	console.error(String(error));
	this.emit('end');
	gutil.beep();
}

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

gulp.task('inline', function () {
	var options = {
	    compress: false
	};
  return gulp.src('tumblr.html')
      .pipe(inlinesource(options))
      .pipe(rename({
          suffix: "-build",
          extname: ".html"
      }))
      .pipe(gulp.dest(paths.dest));
      gutil.beep();
});

gulp.task('build', ['compass','inline'], function(){
	gutil.log(gutil.colors.green('BUILD COMPLETE'));
})

gulp.task('watch', function(){
	gulp.watch('./_sass/*', ['inline']);
	gulp.watch('./js/*.js', ['inline']);
	gulp.watch('./tumblr.html', ['inline']);
	// gulp.watch('./tumblr.html').on('change', livereload.changed);
})

gulp.task('default', ['inline', 'watch'])