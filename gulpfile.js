const gulp = require("gulp");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const runSequence = require("run-sequence");
const moduleImporter = require("sass-module-importer");


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

gulp.task("img", () => {
    return gulp.src(["www/img/**/*.png", "www/img/**/*.jpg"], { base: "www/img/" })
        .pipe(gulp.dest("dest/img/"));
});

gulp.task("css", () => {
    return gulp.src("www/scss/index.scss", { "base": "www/scss" })
        .pipe(plumber({
            errorHandler: (err) => {
                console.log(err);
            }
        }))
        .pipe(sass({ outputStyle: 'expanded',importer: moduleImporter() }).on('error', sass.logError))
        .pipe(gulp.dest("dest/css/"));
});

gulp.task("build", ["img", "pug", "css"], () => {

});

gulp.task('watch', () => {
    gulp.watch("www/**/*.pug", ["pug"]);
    gulp.watch(["www/scss/**/*.scss"], ["css"]);
    gulp.watch(["www/img/**/*.png", "www/img/**/*.jpg"], ["img"])
})

gulp.task('default', ["watch"]);