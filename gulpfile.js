// Code from http://www.siamhtml.com/introduction-to-gulp-js/

// โหลด package "gulp" มาใช้ (บรรทัดนี้ต้องใส่เสมอ)
var gulp = require('gulp')

// Require gulp sass.
var sass = require('gulp-sass');

// โหลด package "browser-sync" มาใช้ (บรรทัดนี้ต้องใส่เวลาติดตั้ง plugin เสริม)
var browserSync = require('browser-sync')

// SCSS dev path
const scssDevPath = "app/scss/**/*.scss"

// เพิ่ม task "browser-sync" ให้ทำพร้อม default task
gulp.task('default', ['sass'], function () {

	// // เมื่อไฟล์ html หรือ css มีการเปลี่ยนแปลง ก็ให้รีเฟรช web browser
	// gulp.watch(['**/*.html'], browserSync.reload)
	// gulp.watch(['**/*.css'], browserSync.reload)

	// เมื่อไฟล์ scss มีการเปลี่ยนแปลง ก็ให้ทำ task "sass" 
	gulp.watch(scssDevPath, ['sass'])
})

// Create a task to compile SASS.
gulp.task('sass', function () {
	return gulp.src(scssDevPath)
		.pipe(sass({
			compass: true, // Use compass.
			style: 'compressed' // Compressed CSS output.
		})
		.on('error', sass.logError))
		.pipe(gulp.dest('public/css'))
})

// สร้าง task ชื่อว่า "browser-sync" ขึ้นมา พร้อมกับระบุงานที่จะให้ task นี้ทำ
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: "./"
		}
	})
})