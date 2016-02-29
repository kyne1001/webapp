'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';
import jshint from 'gulp-jshint';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import clean from 'gulp-clean';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import express from 'express';

const serverport = 5000;
const root = 'dist';

var server = express();
server.use(express.static(`./${root}`));
// Redirects everything back to our index.html
server.all('/*', function(req, res) {
  res.sendFile('index.html', { root: root });
});

// Dev task
gulp.task('server', function() {
  browserSync({
    notify: false,
    proxy: `http://localhost:${serverport}`
  });

  server.listen(serverport);
})

gulp.task('dev', ['server', 'watch']);

// JSHint task
gulp.task('lint', function() {
  gulp.src('app/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('browserify', function() {
  browserify({
    entries: 'app/main.js',
    insertGlobals: true,
    debug: true
  })
  .transform(babelify)
  .bundle()
  // Bundle to a single file and output to dist folder
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['lint'], function() {
  gulp.watch(['app/*.js', 'app/**/*.js'], ['lint', 'browserify', browserSync.reload]);
  gulp.watch(['index.html', 'app/**/*.html'], ['views', browserSync.reload]);
  gulp.watch(['assets/styles/*.scss'], ['styles', browserSync.reload]);
});

// Views task
gulp.task('views', function() {
  gulp.src('index.html')
  .pipe(gulp.dest('dist/'));
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('dist/'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('assets/styles/app.scss')
  .pipe(sass({onError: function(e) { console.log(e); } }))
  .pipe(gulp.dest('dist/css/'))
});

gulp.task('default', ['dev']);
gulp.task('build', ['lint', 'browserify', 'views', 'styles']);
