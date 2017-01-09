'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

var yeoman = {
  app: require('./bower.json').appPath || 'app',
  dist: 'dist'
};

var paths = {
  scripts: [yeoman.app + '/scripts/**/*.js'],
  styles: [yeoman.app + '/styles/**/*.scss'],
  views: {
    main: yeoman.app + '/index.html',
    files: [yeoman.app + '/views/**/*.html']
  },
  images:[yeoman.app + '/images/**/*']
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
  .pipe($.sass, {
    outputStyle: 'expanded',
    precision: 10
  })
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/styles');

///////////
// Tasks //
///////////

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(styles());
});

gulp.task('lint:scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'styles'], function () {
  openURL('http://localhost:8090');
});

gulp.task('start:server', function() {
  $.connect.server({
    root: [yeoman.app, '.tmp'],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port:8090
  });
});



gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    .pipe($.connect.reload());

  gulp.watch('bower.json', ['bower']);
});

gulp.task('serve', ['plugin'],function (cb) {
  runSequence('clean:tmp',
    // ['lint:scripts'],
    ['start:client'],
    'watch', cb);
});


// inject bower components
gulp.task('bower', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory: yeoman.app + '/bower_components',
      ignorePath: '..'
    }))
  .pipe(gulp.dest(yeoman.app));
});


gulp.task('plugin', function() {
  gulp.src('./bower_components/**').pipe(gulp.dest(yeoman.app + '/bower_components'));
});
///////////
// Build //
///////////
gulp.task('revImg', function(){
    return gulp.src(paths.images)
        .pipe($.rev())
        .pipe(gulp.dest(yeoman.dist + '/images'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(yeoman.app +'/rev/img'));
});

gulp.task('clean:dist', function (cb) {
  rimraf('./dist', cb);
});

gulp.task('client:build', ['html', 'revCollectorCss'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src(paths.views.main)
    .pipe($.useref({searchPath: [yeoman.app, '.tmp']}))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe($.rev())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.minifyCss({cache: true}))
    .pipe($.rev())
    .pipe(cssFilter.restore())
    .pipe($.revReplace())
    // .pipe($.minifyHtml({conditionals: true, loose: false}))
    .pipe(gulp.dest(yeoman.dist));
});

// gulp.task('html', function () {
//   return gulp.src(yeoman.app + '/views/**/*')
//    // .pipe($.minifyHtml({conditionals: true, loose: false}))
//     .pipe(gulp.dest(yeoman.dist + '/views'));
// });

gulp.task('html', function () {
  return gulp.src(['app/rev/**/*.json', yeoman.app + '/views/**/*'])
        .pipe(revCollector())
   // .pipe($.minifyHtml({conditionals: true, loose: false}))
    .pipe(gulp.dest(yeoman.dist + '/views'));
});

gulp.task('revCollectorCss', function () {
    return gulp.src(['app/rev/**/*.json', yeoman.app + '/styles/*'])
        .pipe(revCollector())
        .pipe(styles());
});

gulp.task('images', function () {
  return gulp.src(yeoman.app + '/images/**/*')
    .pipe($.cache($.imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest(yeoman.dist + '/images'));
});

gulp.task('copy:extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ]).pipe(gulp.dest('dist'));
});

gulp.task('copy:fonts', function () {
  return gulp.src(yeoman.app + '/bower_components/bootstrap-sass-official/assets/fonts/bootstrap/**/*')
    .pipe(gulp.dest(yeoman.dist + '/fonts'));
});

gulp.task('copy:plugins', function () {
  return gulp.src(yeoman.app + '/plugins/**/*')
  .pipe(gulp.dest(yeoman.dist + '/plugins'));
});

// gulp.task('build', ['clean:dist'], function () {
//   runSequence(['images', 'copy:extras','copy:fonts', 'client:build']);
// });

gulp.task('build', ['clean:dist','revImg'], function () {
  runSequence(['copy:extras','copy:fonts', 'copy:plugins','client:build']);
});