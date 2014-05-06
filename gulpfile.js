'use strict';

var gulp = require('gulp');

var concat      = require('gulp-concat');
var jstConcat   = require('gulp-jst-concat');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var runSequence = require('run-sequence');
var jade        = require('gulp-jade');
var sass        = require('gulp-sass');
var mocha       = require('gulp-mocha');
var clean       = require('gulp-clean');

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

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint', 'testServer']);
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

gulp.task('testServer', function () {
  gulp.src('test/serverSpec.js')
    .pipe(mocha({reporter: 'nyan'}));
});

