/**
 * gulpfile.js
 * gulp file for development
 */
var gulp 	 = require( 'gulp' );
var sass 	 = require( 'gulp-sass' );
var jshint 	 = require( 'gulp-jshint' );
var concat 	 = require( 'gulp-concat' );
var imagemin = require( 'gulp-imagemin' );
var plumber	 = require( 'gulp-plumber' );
var notify 	 = require( 'gulp-notify' );
var livereload = require( 'gulp-livereload' );
var minifyCSS = require( 'gulp-minify-css' );
var rename = require('gulp-rename');
var copy = require('gulp-copy');

var source = 'src/', 
	dest = 'dist/';

var bootstrapSass = {
	in: './node_modules/bootstrap-sass/'
};

var fonts = {
	in: [ source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*' ],
	out: dest + 'fonts/'
};

var scss = {
	in: source + 'scss/twcx-styles.scss',
	out: dest + 'css/',
	watch: source + 'scss/**/*',
	sassOpts: {
		outputStyle: 'nested',
		presicion: 3,
		errLogToConsole: true,
		includePaths: [bootstrapSass.in + 'assets/stylesheets' ]
	},
	outputFile: dest + 'css/twcx-styles.css',
};

var plumberErrorHandler = { 
	errorHandler: notify.onError({
		title: 'Gulp',
		message: 'Error: <%= error.message %>'
	})
};

/* task : copy fonts to dist */	
gulp.task( 'fonts', function(){
	return gulp
		.src(fonts.in)
		.pipe(gulp.dest(fonts.out));
});	

/* task : sass compile */
gulp.task( 'sass', ['fonts'], function() {
	return gulp.src( scss.in )
		// 	// .pipe( plumber(plumberErrorHandler))
		.pipe( sass( scss.sassOpts ) )
		.pipe( gulp.dest( scss.out ) )
		.pipe( gulp.copy() )
		.pipe( livereload() );
});

/* minify output sass / css */
gulp.task( 'minifycss', function(){
	return gulp.src( scss.outputFile )
		.pipe( minifyCSS() )
		.pipe( rename({ suffix: '.min' } ) )
		.pipe( gulp.dest( scss.out ) );
});

/* task : js hint */
gulp.task( 'js', function() {
	gulp.src( [ './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js' , './src/js/*.js'] )
		.pipe( plumber(plumberErrorHandler))
		// .pipe( jshint() )
		// .pipe( jshint.reporter( 'fail' ) )
		.pipe( concat( 'twcx-scripts.js' ) )
		.pipe( gulp.dest( './dist/js' ) )
		.pipe( livereload() );
});

/* task : imagemin */
gulp.task( 'img', function(){
	gulp.src('./src/img/*.{png,jpg,gif}' )
		.pipe( plumber(plumberErrorHandler))
		.pipe( imagemin({
			optimizationLevel: 7,
			progressive: true
		}))
		.pipe( gulp.dest('./dist/img'))
		.pipe( livereload() );
});

/* task : watch */
gulp.task( 'watch', function(){
	livereload.listen();
	gulp.watch( scss.watch, ['sass']);
	gulp.watch('src/js/*.js', ['js'] );
	gulp.watch('src/img/*.{png,jpg,gif}', ['img']);
});

gulp.task( 'default', ['sass', 'js', 'img', 'watch'] );