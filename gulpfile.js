// Initializing Dependancies
var gulp = require ("gulp");
var browserify = require ("browserify");
var source = require ("vinyl-source-stream");
var concat = require ("gulp-concat");
var uglify = require ("gulp-uglify");
var utilities = require ("gulp-util");
var del = require ("del");
var jshint = require ("gulp-jshint");
var sass = require ("gulp-sass");
var sourcemaps = require ("gulp-sourcemaps");
var browserSync = require ("browser-sync").create();
var lib = require('bower-files') ({
  "overrides":{
    "bootstrap" : {
      "main": [
        "less/bootstrap.less",
        "dist/css/bootstrap.css",
        "dist/js/bootstrap.js"
      ]
    }
  }
});

var buildProduction = utilities.env.production;

// This task concatinates files with -interface.js file extension and saves the results to allConcat.js in the tmp folder

gulp.task ("concatInterface", function() {
  return gulp.src (["./js/*-interface.js"])
    .pipe (concat("allConcat.js"))
    .pipe (gulp.dest("./tmp"));
});

// This task translates the interface in a way the browser can understand and copies the the results in app.js

gulp.task ("jsBrowserify", ["concatInterface"], function() {
  return browserify ({entries: ["./tmp/allConcat.js"]})
    .bundle()
    .pipe (source("app.js"))
    .pipe (gulp.dest("./build/js"));
});

// Task to Minify browserified files
gulp.task ("minifyScripts", ["jsBrowserify"], function() {
  return gulp.src ("./build/js/app.js")
    .pipe (uglify())
    .pipe (gulp.dest("./build/js"));
});

// Concatinate and minify all bower Dependancies
gulp.task ("bowerJS", function() {
  return gulp.src (lib.ext("js").files)
    .pipe (concat("vendor.min.js"))
    .pipe (uglify())
    .pipe (gulp.dest("./build/js"));
});
// Concatinate and minify all bower css files

gulp.task ("bowerCSS", function() {
  return gulp.src (lib.ext("css").files)
    .pipe (concat("vendor.css"))
    .pipe (gulp.dest("./build/css"));
});



// The cssBuild task takes all .scss files files passes the sass package init and saves the results in the biuld/css directory
gulp.task ("cssBuild", function() {
  return gulp.src (["scss/*.scss"])
    .pipe (sourcemaps.init())
    .pipe (sass())
    .pipe (sourcemaps.write())
    .pipe (gulp.dest("./build/css"))
    .pipe (browserSync.stream());
});

gulp.task ("bower", ["bowerJS", "bowerCSS"]);

gulp.task ("clean", function() {
  return del (["build", "tmp"]);
});

gulp.task ("build", ["clean"], function() {
  if (buildProduction) {
    gulp.start ("minifyScripts");
  } else {
    gulp.start ("jsBrowserify");
  }
  gulp.start ("bower");
  gulp.start ("cssBuild");
});

// This Task jshint helps us to detect errors and potential problems in all JavaScript files.
gulp.task ("jshint", function() {
  return gulp.src (["js/*.js"])
    .pipe (jshint())
    .pipe (jshint.reporter("default"));
});

// Each of the following three task reloads our server when (JS, bower dependencies, and HTML) are changed,
 // after running the necessary dependencies.

gulp.task ("jsBuild", ["jsBrowserify", "jshint"], function() {
  browserSync.reload();
});

gulp.task ("bowerBuild", ["bower"], function() {
  browserSync.reload();
});

gulp.task ("htmlBuild", function() {
  browserSync.reload();
});
// This task tells the local serve to host our sites locally by reading index.html first.
gulp.task ("server", function() {
  browserSync.init ({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch (["js/*.js"], ["jsBuild"]);
  gulp.watch (["scss/*.scss"], ["cssBuild"]);
  gulp.watch (["bower.json"], ["bowerBuild"]);
  gulp.watch (["*.html"], ["htmlBuild"]);
});
