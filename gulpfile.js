const gulp = require("gulp");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const sass = require("gulp-sass");


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

gulp.task("sass",()=>{
    return gulp.src("www/scss/**/*.scss",{"base": "www/scss"})
        .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
        .pipe(gulp.dest("dest/css/"));
});

gulp.task("build", ["pug","sass"], () => {

});

gulp.task('watch', () => {
    gulp.watch("www/**/*.pug", ["pug"]);
    gulp.watch("www/scss/**/*.scss",["sass"]);
})

gulp.task('default', ["watch"]);