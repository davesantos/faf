var
  theTime = Math.round(new Date().getTime() / 1000),
  gulp = require('gulp'),
  changed = require('gulp-changed'),
  del = require('del'),
  inject = require('gulp-inject-string'),
  gutil = require('gulp-util'),
  inlinesource = require('gulp-inline-source'),
  removeEmptyLines = require('gulp-remove-empty-lines'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  paths = {
    theme: 'tumblr.html',
    dest: 'build',
    sass: '_sass',
    css: 'css',
    js: 'js/build'
  };

function errorHandler(error) {
  console.error(String(error));
  this.emit('end');
}

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('sass', function(){
  gulp.src(paths.sass + '/**/*.{sass,scss}')
    .pipe(sass({outputStyle: 'compressed'}).on('error', errorHandler))
    .pipe(gulp.dest(paths.css))
});

gulp.task('build', ['sass'], function () {

  var options = {
      compress: false
  };

  gutil.log(gutil.colors.green('Build : ' + theTime));

  return gulp.src('tumblr.html')
    .pipe(inlinesource(options))
    .pipe(removeEmptyLines())
    .pipe(inject.after('</title>', '\n<!-- Build: ' + Date() + ' -->\n'))
    .pipe(rename({
        suffix: "-" + theTime,
        extname: ".html"
    }))
    .pipe(gulp.dest(paths.dest));

});

gulp.task('watch', function(){
  gulp.watch( paths.sass + '/**/*.{sass,scss}', ['build']);
  gulp.watch('./js/*.js', ['build']);
  gulp.watch('./tumblr.html', ['build']);
});

gulp.task('default', ['build', 'clean', 'watch'])