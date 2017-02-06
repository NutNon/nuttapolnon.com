// Guided by http://www.siamhtml.com/introduction-to-gulp-js/
var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync')
var concat = require('gulp-concat')
var ts = require('gulp-typescript');

// SCSS dev path
const scssDevPath = "./src/scss/**/*.scss"

// HTML client dev path
const htmlClientDevPath	=	"./src/html/**/*.html"

// Resources client dev path
const resourcesDevPath = "./src/resources/**/*.*"

// Typescript dev path
const tsDevPath	=	'./src/**/*.ts'

// Default gulp task when hit "gulp" in cli.
gulp.task('default', ['sass', 'html-to-public', 'resources-to-public', 'concat-vendor-js', 'concat-vendor-css', 'compile-ts'], function () {

	// // เมื่อไฟล์ html หรือ css มีการเปลี่ยนแปลง ก็ให้รีเฟรช web browser
	// gulp.watch(['**/*.html'], browserSync.reload)
	// gulp.watch(['**/*.css'], browserSync.reload)

	// Run task "sass" when SCSS files changed. 
	gulp.watch(scssDevPath, ['sass'])

	// Run task "html-to-public" when HTML files changed.
	gulp.watch(htmlClientDevPath, ['html-to-public'])

	// Run task "resources-to-public" when files changed.
	gulp.watch(resourcesDevPath, ['resources-to-public'])

	// Run task "compile-ts" when TS files changed.
	gulp.watch(tsDevPath, ['compile-ts'])
})

// Create a task to compile SASS.
gulp.task('sass', function () {
	return gulp.src(scssDevPath)
		.pipe(sass({
			outputStyle: 'compressed' // Output compressed CSS.
		})
		.on('error', sass.logError))
		.pipe(gulp.dest('./build/css'))
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
		base: './src/html'
	})
	.pipe(gulp.dest('./build/'))
})

// Create a task to copy resources in src to build.
gulp.task('resources-to-public', function () {
	return gulp.src(resourcesDevPath, {
		base: './src/resources'
	})
	.pipe(gulp.dest('./build/'))
})

// Create a task to concatenate vendor script.
gulp.task('concat-vendor-js', function() {
  return gulp.src([
		'./bower_components/jquery/dist/jquery.min.js', 
		'./bower_components/materialize/dist/js/materialize.min.js'
	])
	.pipe(concat('vendors.js'))
	.pipe(gulp.dest('./build/js/'))
})

// Create a task to concatenate vendor css.
gulp.task('concat-vendor-css', function() {
  return gulp.src([
		'./bower_components/materialize/dist/css/materialize.min.css'
	])
	.pipe(concat('vendors.css'))
	.pipe(gulp.dest('./build/css/'))
})

// Create a task to compile typescript.
gulp.task('compile-ts', function () {
	return gulp.src(tsDevPath)
		.pipe(ts({
			noImplicitAny: true,
			out: 'script.js'
		}))
		.pipe(gulp.dest('./build/js'));
});