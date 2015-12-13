var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('default', ['build'], function () {
  browserSync({
    notify: false,
    server: {
      baseDir: '.'
    }
  });
  gulp.watch(['*.html', 'js/*.js', 'scss/*.scss'], ['reload']);
});

gulp.task('build', ['script', 'styles']);

gulp.task('script', function () {
  gulp.src('js/*.js')
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('styles', function() {
  gulp.src('scss/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

gulp.task('reload', ['build'], browserSync.reload);
