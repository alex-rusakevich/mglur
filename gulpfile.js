var gulp = require("gulp");
var less = require("gulp-less");
var path = require("path");
var cleanCSS = require("gulp-clean-css");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var nunj_render = require("gulp-nunjucks-render");

gulp.task("less", function () {
    return gulp.src("./src/less/**/*.less")
        .pipe(less({
            paths: [path.join(__dirname, "less", "includes")]
        }))
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(gulp.dest("./static/css"));
});

gulp.task("html-min", function () {
    return gulp.src(["./src/*.html"])
        .pipe(nunj_render({
            path: ['./src/templates']
        }))
        .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true }))
        .pipe(gulp.dest("./"));
});

gulp.task("js-min", function () {
    gulp.src(["./src/js/*.js"])
        .pipe(gulp.dest("./static/js"))
});

gulp.task("watch", function () {
    gulp.watch("./src/less/**/*.less", ["less"]);
    gulp.watch("./src/js/*.js", ["js-min"]);
    gulp.watch(["./src/*.html", "./src/templates/*.njk"], ["html-min"]);
});

gulp.task("default", ["less", "js-min", "html-min"]);
