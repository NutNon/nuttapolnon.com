// Code from http://www.siamhtml.com/introduction-to-gulp-js/

// โหลด package "gulp" มาใช้ (บรรทัดนี้ต้องใส่เสมอ)
var gulp = require('gulp')

// Require gulp sass.
var sass = require('gulp-sass')

// โหลด package "browser-sync" มาใช้ (บรรทัดนี้ต้องใส่เวลาติดตั้ง plugin เสริม)
var browserSync = require('browser-sync')

// SCSS dev path
const scssDevPath = "./app/scss/**/*.scss"

// HTML client dev path
const htmlClientDevPath	=	"./app/html/**/*.html"

// เพิ่ม task "browser-sync" ให้ทำพร้อม default task
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

// สร้าง task ชื่อว่า "browser-sync" ขึ้นมา พร้อมกับระบุงานที่จะให้ task นี้ทำ
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: "./"
		}
	})
})

// Task to copy html in src to build.
gulp.task('html-to-public', function () {
	return gulp.src(htmlClientDevPath, {
		base: './app/html'
	})
	.pipe(gulp.dest('./public/html/'))
})