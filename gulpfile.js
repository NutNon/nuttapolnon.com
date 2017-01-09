// Code from http://www.siamhtml.com/introduction-to-gulp-js/

// โหลด package "gulp" มาใช้ (บรรทัดนี้ต้องใส่เสมอ)
var gulp = require('gulp')

// โหลด package "gulp-ruby-sass" มาใช้ (บรรทัดนี้ต้องใส่เวลาติดตั้ง plugin เสริม)
var sass = require('gulp-ruby-sass')

// โหลด package "browser-sync" มาใช้ (บรรทัดนี้ต้องใส่เวลาติดตั้ง plugin เสริม)
var browserSync = require('browser-sync')

// SCSS dev path
const scssDevPath	=	"app/scss/**/*.scss"

// เพิ่ม task "browser-sync" ให้ทำพร้อม default task
gulp.task('default', ['sass'], function () {

	// // เมื่อไฟล์ html หรือ css มีการเปลี่ยนแปลง ก็ให้รีเฟรช web browser
	// gulp.watch(['**/*.html'], browserSync.reload)
	// gulp.watch(['**/*.css'], browserSync.reload)

	// เมื่อไฟล์ scss มีการเปลี่ยนแปลง ก็ให้ทำ task "sass" 
	gulp.watch(scssDevPath, ['sass'])
})

gulp.task('sass', function () {
	sass([scssDevPath])
		.on('error', sass.logError)
		.pipe(gulp.dest('public/css'))
})

// // สร้าง task ชื่อว่า "sass" ขึ้นมา พร้อมกับระบุงานที่จะให้ task นี้ทำ
// gulp.task('sass', function () {
// 	// ให้คอมไพล์ .scss ทุกไฟล์ที่อยู่ในโฟลเดอร์ scss
// 	return gulp.src(['scss/**/*.scss'])
// 		.pipe(sass({
// 			compass: true, // ใช้ Compass
// 			style: 'compressed', // เลือก output แบบ compressed
// 		}))
// 		.on('error', function (err) {
// 			console.log(err.message)
// 		})
// 		.pipe(gulp.dest('public/css')) // เก็บไฟล์ css ไว้ที่โฟลเดอร์ css
// })

// สร้าง task ชื่อว่า "browser-sync" ขึ้นมา พร้อมกับระบุงานที่จะให้ task นี้ทำ
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: "./"
		}
	})
})