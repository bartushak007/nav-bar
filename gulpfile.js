var gulp = require("gulp"),
	sass = require("gulp-sass"),
	browserSync = require("browser-sync"),
	plumber = require("gulp-plumber"),
	pug = require("gulp-pug"),
	prettyHtml = require("gulp-pretty-html");

gulp.task("sass", function() {
	gulp
		.src("app/sass/main.scss")
		.pipe(plumber())
		.pipe(sass({ outputStyle: "expanded" }))
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task("watch", ["sass", "browser", "pug"], function() {
	gulp.watch("app/sass/**/*.scss", ["sass"]);
	gulp.watch("app/index.html", browserSync.reload);
	gulp.watch("app/mygup/*.gup", ["pug"]);
});

gulp.task("browser", function() {
	browserSync({
		server: { baseDir: "app" },
		notify: false
	});
});

gulp.task("build", function() {
	var buildCss = gulp.src(["app/css/*.css"]).pipe(gulp.dest("build/css"));
	var buildCss = gulp.src(["app/images/*.*"]).pipe(gulp.dest("build/images"));
	var buildHtml = gulp.src("app/*.html").pipe(gulp.dest("build"));
});

gulp.task("pug", function() {
	gulp
		.src("app/mypug/*.pug")
		.pipe(pug())
		.pipe(prettyHtml({ indent_size: 2, extra_liners: [] }))
		.pipe(gulp.dest("app"))
		.pipe(browserSync.reload({ stream: true }));
});
