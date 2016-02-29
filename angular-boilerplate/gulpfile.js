var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass');

// Webserver and browserSync
var browserSync = require('browser-sync'),
    express = require('express'),
    serverport = 5000;

// Set up an express server (but not starting it yet)
var server = express();
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Redirects everything back to our index.html
server.all('/*', function(req, res) {
  res.sendFile('index.html', { root: 'dist' });
});

// Dev task
gulp.task('server', function() {
  browserSync({
    notify: false,
    proxy: "http://localhost:" + serverport
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
  gulp.src(['index.html'])
  .pipe(gulp.dest('dist/'));
  gulp.src(['app/**/*.html'])
  .pipe(gulp.dest('dist/'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('assets/styles/app.scss')
  .pipe(sass({onError: function(e) { console.log(e); } }))
  .pipe(gulp.dest('dist/css/'));
});

gulp.task('default', ['dev']);
gulp.task('build', ['lint', 'browserify', 'views', 'styles']);
