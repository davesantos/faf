var gulp = require('gulp'),
 	sass = require('gulp-ruby-sass'),
 	inlinesource = require('gulp-inline-source');

function errorHandler(error) {
	console.error(String(error));
	this.emit('end');
}


gulp.task('sass', function(){
	return gulp.src('_sass/*.sass')
	    .pipe(sass({sourcemapPath: '../_sass'}))
	    .on('error', errorHandler)
	    .pipe(gulp.dest('css'));
});

gulp.task('inline', ['sass'], function () {
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