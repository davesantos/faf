var gulp = require('gulp'),
 	compass = require('gulp-compass'),
 	inlinesource = require('gulp-inline-source');

function errorHandler(error) {
	console.error(String(error));
	this.emit('end');
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


gulp.task('inline', ['compass'], function () {
	var options = {
	    compress: false
	};
    return gulp.src('tumblr.html')
        .pipe(inlinesource(options))
        .pipe(gulp.dest('./deploy'));
});

gulp.task('watch', function(){
	gulp.watch('./_sass/*', ['inline']);
	// gulp.watch('./src/css/*').on('change', livereload.changed);
})

gulp.task('default', ['watch'])