var gulp = require("gulp");
var minimist = require("minimist");
var sass = require("gulp-sass");
var debug = require("gulp-debug");
var autoprefixer = require("gulp-autoprefixer");
var browser = require("browser-sync");

/**
 * settings
 */
var knownOptions = {
  string: "env",
  default: {
    env: process.env.NODE_ENV || "development"
  }
};

var options = minimist(process.argv.slice(2), knownOptions);
var isProduction = (options.evn === "production")? true: false;

console.log("[build env]", options.env, "[is production]", isProduction);

/**
 * tasks
 */

gulp.task("default", ["sass", "js"]);

gulp.task("watch", ["server"], function(){
  gulp.watch(["source/js/**/*.js"], ["js"]);
  gulp.watch(["source/sass/**/*.scss"], ["sass"]);
});

gulp.task("sass", function(){
  gulp.src("source/sass/**/*scss")
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer())
    .pipe(debug({title: "scss"}))
    .pipe(gulp.dest("./build/css"))
    .pipe(browser.reload({stream: true}));
})

gulp.task("js", function(){
  gulp.src(["source/js/**/*.js"])
    .pipe(debug({title: "js"}))
    .pipe(gulp.dest("./build/js"))
    .pipe(browser.reload({stream: true}));
});

gulp.task("server", function(){
  browser({
    server: {
      baseDir: "./build"
    }
  });
});
