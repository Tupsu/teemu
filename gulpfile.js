"use strict"
const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const cleanCSS     = require('gulp-clean-css');
const minifyHTML   = require('gulp-minify-html');
const minifyInline = require('gulp-minify-inline');
const del          = require('del');
const runSequence  = require('run-sequence');


gulp.task('clean', () => {
  return del(['dist/*']);
});

gulp.task('build', cb => {
  runSequence('clean',
              ['sass', 'html'],
              'minify-css',
              'cp-assets',
              cb);
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
		    baseDir: "./"
		}
    });
	gulp.watch("sass/*.sass", ['sass']);
	gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    let stream = gulp.src("sass/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("css/"));
    if (browserSync.active) {
      stream = stream.pipe(browserSync.stream());
    }
    return stream;
});

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('html', () => {
  return gulp.src('./*.html')
    .pipe(minifyInline())
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/'));
});

gulp.task('cp-assets', () => {
  return gulp.src('./resume.pdf')
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', cb => runSequence('sass', 'serve', cb));
