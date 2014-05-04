'use strict';

var gulp = require('gulp');

var jstConcat   = require('gulp-jst-concat');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var runSequence = require('run-sequence');
var jade        = require('gulp-jade');
var mocha       = require('gulp-mocha');
var clean       = require('gulp-clean');

var paths = {
  // css: 'client/style/scss/**/*.scss',
  scripts: ['*.js', 'server/**/*.js', 'client/js/*.js', 'test/**/*.js'],
  images: 'client/img/**/*',
  templates: 'client/views/templates/**/*.jade'
};

gulp.task('templates', function() {
  gulp.src(paths.templates)
    .pipe(jade())
    .pipe(gulp.dest('client/views/templates/compiled/'));
});

// Compile client-side views into single JST file
gulp.task('JST', function () {
  gulp.src('client/views/templates/compiled/**/*.html')
    .pipe(jstConcat('jst.js', {
      renameKeys: ['^.*templates/compiled/(.*).html$', '$1']
    }))
    .pipe(gulp.dest('client/js/templates'));
});

// JS Linter
gulp.task('lint', function() {
  gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint']);
  gulp.watch(paths.templates, ['JST']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', function(callback) {
  runSequence(['templates'],
               'JST',
               'watch');
});

gulp.task('test', function () {
  gulp.src('test/serverSpec.js')
    .pipe(mocha({reporter: 'nyan'}));
});

