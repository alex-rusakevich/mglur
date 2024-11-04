var gulp = require("gulp");
var less = require("gulp-less");
var path = require("path");
var fs = require("fs");
var htmlmin = require("gulp-htmlmin");
const minify = require('gulp-minify');
var nunj_render = require("gulp-nunjucks-render");


gulp.task("less", function () {
    return gulp.src("./src/less/**/*.less")
        .pipe(less({
            paths: [path.join(__dirname, "less", "includes")]
        }))
        .pipe(gulp.dest("./static/css"));
});

gulp.task("html-min", function () {
    var proj_version = JSON.parse(fs.readFileSync('package.json', 'utf8'))["version"];
    return gulp.src(["./src/*.html"])
        .pipe(nunj_render({
            path: ['./src/templates'],
            data: {
                version: proj_version
            }
        }))
        .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true }))
        .pipe(gulp.dest("./"));
});

gulp.task("js-min", async function () {
    gulp.src(["./src/js/*.js"])
        .pipe(minify({}))
        .pipe(gulp.dest("./static/js"))
});

gulp.task("watch", function () {
    gulp.watch("./src/less/**/*.less", ["less"]);
    gulp.watch("./src/js/*.js", ["js-min"]);
    gulp.watch(["./src/*.html", "./src/templates/*.njk"], ["html-min"]);
});

gulp.task("default", gulp.parallel('less', 'js-min', "html-min"));
