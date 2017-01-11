// Guided by http://www.siamhtml.com/introduction-to-gulp-js/
var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync')

// SCSS dev path
const scssDevPath = "./app/scss/**/*.scss"

// HTML client dev path
const htmlClientDevPath	=	"./app/html/**/*.html"

// Default gulp task when hit "gulp" in cli.
gulp.task('default', ['sass', 'html-to-public'], function () {

	// // เมื่อไฟล์ html หรือ css มีการเปลี่ยนแปลง ก็ให้รีเฟรช web browser
	// gulp.watch(['**/*.html'], browserSync.reload)
	// gulp.watch(['**/*.css'], browserSync.reload)

	// เมื่อไฟล์ scss มีการเปลี่ยนแปลง ก็ให้ทำ task "sass" 
	gulp.watch(scssDevPath, ['sass'])

	// Run task "html-to-public" when HTML files changed.
	gulp.watch(htmlClientDevPath, ['html-to-public'])
})

// Create a task to compile SASS.
gulp.task('sass', function () {
	return gulp.src(scssDevPath)
		.pipe(sass({
			outputStyle: 'compressed' // Output compressed CSS.
		})
		.on('error', sass.logError))
		.pipe(gulp.dest('./public/css'))
})

// Create a task to sync browser.
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: "./"
		}
	})
})

// Create a task to copy html in src to build.
gulp.task('html-to-public', function () {
	return gulp.src(htmlClientDevPath, {
		base: './app/html'
	})
	.pipe(gulp.dest('./public/html/'))
})