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
    usemin      = require('gulp-usemin'),
    mocha       = require('gulp-mocha'),
    clean       = require('gulp-clean');

var paths = {
  css: 'client/style/scss/**/*.scss',
  scripts: ['*.js', 'server/**/*.js', 'client/js/**/*.js', 'client/style/*.js', 'test/**/*.js'],
  images: 'client/img/**/*',
  templates: 'client/views/templates/**/*.jade'
};

gulp.task('default', function(callback) {
  runSequence(['templates', 'sass'],
               'JST',
               // 'lint',
               'watch');
});


// Convert JADE into HTML (problem with retaining variables for client-side templating)
gulp.task('templates', function() {
  gulp.src(paths.templates)
    .pipe(jade({
      locals: {
        model: {}
      }
    }))
    .pipe(gulp.dest('client/views/templates/compiled'));
});

// Compile SASS
gulp.task('sass', function () {
  gulp.src(paths.css)
    .pipe(sass())
    .pipe(gulp.dest('client/style/css'));
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

// Rerun the task when a file changes
gulp.task('watch', function() {
  // gulp.watch(paths.scripts, ['lint']);
  gulp.watch(paths.css, ['sass']);
  gulp.watch(paths.templates, ['build-scripts']);
});

gulp.task('build', function(callback) {
  runSequence('build-clean',
              ['build-extras', 'build-scripts', 'build-styles'],
              'build-html',
              callback);
});

gulp.task('build-clean', function() {
    return gulp.src('dist').pipe(clean());
//  ^^^^^^
//   This is the key here, to make sure tasks run asynchronously!
});

gulp.task('build-scripts', function(callback) {
    runSequence('templates', 'JST', callback);
});

gulp.task('build-styles', function(callback) {
    runSequence('sass', callback);
});

gulp.task('build-html', function(callback) {
    runSequence(['usemin', 'build-images'], callback);
});

gulp.task('build-extras', function(){
    gulp.src(['client/favicon.ico', 'client/*.txt', 'client/.htaccess'])
      .pipe(gulp.dest('dist/'));
});

gulp.task('build-images', function(){
    gulp.src(['client/img/*'])
      .pipe(gulp.dest('dist/img'));
});

gulp.task('testServer', function () {
  gulp.src('test/serverSpec.js')
    .pipe(mocha({reporter: 'nyan'}));
});

