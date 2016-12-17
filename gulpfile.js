const gulp = require("gulp");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const rework = require("gulp-rework");
const reworkNPM = require("rework-npm");
const runSequence = require("run-sequence");


gulp.task('pug', () => {
    gulp.src("www/**/*.pug", { base: "www" })
        .pipe(plumber({
            errorHandler: (err) => {
                console.log(err);
            }
        }))
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest("dest/"));
})

gulp.task("rework", () => {
    return gulp.src("www/scss/import.css")
        .pipe(rework(reworkNPM()))
        .pipe(gulp.dest("dest/css/"));
})

gulp.task("sass", () => {
    return gulp.src(["www/scss/**/*.scss","!www/scss/import.scss"], { "base": "www/scss" })
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest("dest/css/"));
});

gulp.task("css", ["sass","rework"],() => {
});

gulp.task("build", ["pug", "css"], () => {

});

gulp.task('watch', () => {
    gulp.watch("www/**/*.pug", ["pug"]);
    gulp.watch(["www/scss/**/*.scss","!www/scss/import.scss"], ["css"]);
    gulp.watch("www/scss/import.css",["rework"])
})

gulp.task('default', ["watch"]);