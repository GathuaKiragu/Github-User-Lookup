var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('bowerCSS', function () {
    return gulp.src(lib.ext('css').files).pipe(concat('vendor.css')).pipe(gulp.dest('./build/css'));
});
gulp.task('myTask', function () {
    console.log('hello gulp');
});
//This concats the code so that it's short'
gulp.task('concatInterface', function () {
    return gulp.src(['./js/*-interface.js']) //    array of js files to be concated
        .pipe(concat('allConcat.js')) //makes a folder called allConcat.js
        .pipe(gulp.dest('./tmp')); // destination is the tmp folder
});
//When browserify is run it will also run concat at the same time but it has to be predefined
gulp.task('jsBrowserify', ['concatInterface'], function () {
    return browserify({
        entries: ['./tmp/allConcat.js']
    }).bundle().pipe(source('app.js')).pipe(gulp.dest('./build/js'));
});
//combined functionality of jsBrowserify into minify so that it works at once. This is beautiful
gulp.task("minifyscripts", ["jsBrowserify"], function () {
    return gulp.src("./build/js/app.js").pipe(uglify()).pipe(gulp.dest("./build/js"));
});
// combines functionality of build and clean
gulp.task("clean", function () {
    return del(['build', 'tmp']);
});
var jshint = require('gulp-jshint');
gulp.task('jshint', function () {
    return gulp.src(['js/*.js']).pipe(jshint()).pipe(jshint.reporter('default'));
});
var lib = require('bower-files')();
gulp.task('bowerJS', function () {
    return gulp.src(lib.ext('js').files).pipe(concat('vendor.min.js')).pipe(gulp.dest('./build/js'));
});
gulp.task('bower', ['bowerJS', 'bowerCSS']);
gulp.task('build', ['clean'], function () {
    if (buildProduction) {
        gulp.start('minifyScripts');
    }
    else {
        gulp.start('jsBrowserify');
    }
    gulp.start('bower');
});