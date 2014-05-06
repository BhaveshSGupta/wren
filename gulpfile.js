'use strict';

var gulp = require('gulp');

var concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    jstConcat   = require('gulp-jst-concat'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    runSequence = require('run-sequence'),
    jade        = require('gulp-jade'),
    sass        = require('gulp-sass'),
    rev         = require('gulp-rev'),
    minifyHTML  = require('gulp-minify-html'),
    minifyCSS   = require('gulp-minify-css'),
    imagemin    = require('gulp-imagemin'),
    usemin      = require('gulp-usemin'),
    mocha       = require('gulp-mocha'),
    clean       = require('gulp-clean');

var paths = {
  css: 'client/style/scss/**/*.scss',
  scripts: ['*.js', 'server/**/*.js', 'client/js/**/*.js', 'client/style/*.js', 'test/**/*.js'],
  images: 'client/img/**/*',
  templates: 'client/views/templates/**/*.jade'
};

// Compile SASS
gulp.task('sass', function () {
  gulp.src(paths.css)
    .pipe(sass())
    .pipe(gulp.dest('client/style/css'));
});

gulp.task('templates', function() {
  gulp.src(paths.templates)
    .pipe(jade({
      locals: {
        model: {}
      }
    }))
    .pipe(gulp.dest('client/views/templates/compiled'));
});

// Compile client-side views into single JST file
gulp.task('JST', function () {
  gulp.src('client/views/templates/compiled**/*html')
    .pipe(jstConcat('templates.js', {
      renameKeys: ['^.*views/templates/compiled/(.*).html$', '$1']
    }))
    .pipe(gulp.dest('client/js/templates'));
});

// JS Linter
gulp.task('lint', function() {
  gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Minify CSS, HTML and JS
gulp.task('usemin', function() {
  gulp.src('client/*.html')
    .pipe(usemin({
      css: [minifyCSS(), 'concat'],
      html: [minifyHTML({empty: true})],
      js: [uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/images'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint']);
  gulp.watch(paths.css, ['sass']);
  gulp.watch(paths.templates, ['templates', 'JST']);
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', function(callback) {
  runSequence(['templates', 'sass'],
               'JST',
               'lint',
               'watch');
});

gulp.task('build', function(callback) {
  runSequence('build-clean',
              ['build-scripts', 'build-styles'],
              'build-html',
              callback);
});

gulp.task('build-clean', function() {
    return gulp.src('dist').pipe(clean());
//  ^^^^^^
//   This is the key here, to make sure tasks run asynchronously!
});

gulp.task('build-scripts', function(callback) {
    runSequence('JST', callback);
});

gulp.task('build-styles', function(callback) {
    runSequence('sass', callback);
});

gulp.task('build-html', function(callback) {
    runSequence(['usemin', 'images'], callback);
});


gulp.task('testServer', function () {
  gulp.src('test/serverSpec.js')
    .pipe(mocha({reporter: 'nyan'}));
});

