var gulp    = require('gulp');
var uglify  = require('gulp-uglify');
var zip     = require('gulp-zip');
var replace = require('gulp-replace');

var info = require('./package.json');

function set_info(info) {
  return replace(/\{\{.+(?!\{)\}\}/g, function (x) {
      x = x.split("{").pop().split("}")[0];
      return info[x];
    });
};

gulp.task('minify', function () {
  return gulp.src(['src/*.js'])
    .pipe(set_info(info))
    .pipe(uglify())
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

gulp.task('c2addon', ['minify', 'copy-icon', 'info-xml'], function () {
  return gulp.src(['dist/**/*.js', 'dist/**/*.ico', 'dist/info.xml'])
    .pipe(zip('node-downloader-'+ info['version'] + '.c2addon'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['c2addon']);
