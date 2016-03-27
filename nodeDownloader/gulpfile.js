"use strict";

var fs      = require('fs');
var gulp    = require('gulp');
var uglify  = require('gulp-uglify');
var zip     = require('gulp-zip');
var replace = require('gulp-replace');
var clean   = require('gulp-clean');

var info = require('./package.json');

function set_info(info) {
  return replace(/\{\{.+(?!\{)\}\}/g, function (x) {
      x = x.split("{").pop().split("}")[0];
      return info[x];
    });
}

gulp.task('minify', function () {
  return gulp.src(['src/*.js'])
    .pipe(set_info(info))
    // .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist/files/nodeDownloader'));
});

gulp.task('copy-icon', function () {
  return gulp.src('src/*.ico')
    .pipe(gulp.dest('dist/files/nodeDownloader'));
});

gulp.task('info-xml', function () {
  return gulp.src('src/info.xml')
    .pipe(set_info(info))
    .pipe(gulp.dest('dist'));
});

gulp.task('gh-pages', ['c2addon'], function () {
    try {
        fs.access('./../gh-pages', fs.F_OK, function (err) {

          if (err) return;

          gulp.src(['./*.c2addon', './samples/*.capx'])
            .pipe(gulp.dest('./../gh-pages/other/node-downloader/'))
            .pipe(zip('ndl.zip'))
            .pipe(gulp.dest('./../gh-pages/other/node-downloader/'));

        });
    } catch (e) {}
});

gulp.task('c2addon', ['minify', 'copy-icon', 'info-xml'], function () {
  return gulp.src(['dist/**/*.js', 'dist/**/*.ico', 'dist/info.xml'])
    .pipe(zip('node-downloader-'+ info['fversion'] + '.c2addon'))
    .pipe(gulp.dest('./'))
      .on('finish', function () {
          gulp.src('dist', {read: false})
            .pipe(clean());
      });
});

gulp.task('default', ['c2addon']);
