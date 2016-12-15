const gulp = require("gulp");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");


gulp.task('pug', () => {
    gulp.src("www/**/*.pug", { base: "www" })
        .pipe(plumber({
            errorHandler: (err) => {
                console.log(err);
            }
        }))
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest("www/"));
})

gulp.task("build", ["pug"], () => {

});

gulp.task('watch', () => {
    gulp.watch("www/**/*.pug", ["pug"]);
})

gulp.task('default', ["watch"]);