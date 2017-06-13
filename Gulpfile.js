var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var bsConfig = require('./bs-config.json');
var bs = require('browser-sync');
var reload = bs.reload;

gulp.task('greeting', function () {
    console.log('Hello taskrunner!');
});


gulp.task('first-task', function () {
    console.log('running first task');
});

gulp.task('pug', function () {
    gulp.src('app/templates/*.pug')
        .pipe(pug('index.html')).on('error', sass.logError)
        .pipe(gulp.dest('./dist/'))
        .pipe(reload({ stream: true }));

});

gulp.task('sass', function () {
    gulp.src('app/sass/**/*.sass')
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest('./dist/css/'))
        .pipe(reload({ stream: true }));
});

gulp.task('pug-watch', ['pug'], function () {
    gulp.watch('app/templates/*.pug', ['pug'], reload);
});

gulp.task('sass-watch', ['sass'], function () {
    gulp.watch('app/sass/*.sass', ['sass'], reload);
});

gulp.task('default', ['first-task', 'pug', 'sass'], function () {
  bs(bsConfig);
  gulp.watch('app/templates/*.pug', ['pug-watch'], reload);
  gulp.watch('app/sass/*.sass', ['sass-watch'], reload);
});