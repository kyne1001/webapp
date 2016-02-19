var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass');

// Webserver and liveload
var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Because I like HTML5 pushstate .. this redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist' });
});

// Dev task
gulp.task('dev', function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.run('watch');
});

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
  gulp.watch(['app/*.js', 'app/**/*.js'], ['lint', 'browserify']);
  gulp.watch(['app/index.html', 'app/**/*.html'], ['views']);
  gulp.watch(['app/assets/styles/*.scss'], ['styles']);
});

// Views task
gulp.task('views', function() {
  gulp.src('app/index.html')
  .pipe(gulp.dest('dist/'))
  .pipe(refresh(lrserver));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('app/assets/styles/*.scss')
  .pipe(sass({onError: function(e) { console.log(e); } }))
  .pipe(gulp.dest('dist/css/'))
  .pipe(refresh(lrserver));
});

gulp.task('default', ['dev', 'watch']);
gulp.task('build', ['lint', 'browserify', 'views', 'styles']);
