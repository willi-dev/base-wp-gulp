/**
 * gulpfile.js
 * gulp file for development
 */
var gulp 	 	= require( 'gulp' ),
	sass 	 	= require( 'gulp-sass' ),
	jshint 	 	= require( 'gulp-jshint' ),
	uglify		= require( 'gulp-uglify' ),
	concat 	 	= require( 'gulp-concat' ),
	imagemin 	= require( 'gulp-imagemin' ),
	plumber	 	= require( 'gulp-plumber' ),
	notify 	 	= require( 'gulp-notify' ),
	livereload 	= require( 'gulp-livereload' ),
	minifyCSS 	= require( 'gulp-minify-css' ),
	rename 		= require( 'gulp-rename' ),
	copy 		= require( 'gulp-copy' );

var filePrefix = 'twcx', // you can change with your prefix
	fileCSS 		= filePrefix + '-styles',
	fileCSSOutput 	= fileCSS + '.css',
	fileSCSSOutput 	= fileCSS + '.scss',
	fileJS 			= filePrefix + '-scripts',
	fileJSOutput	= fileJS + '.js'; 

var source = 'assets/src/', 
	dest = 'assets/dist/';

var bootstrapSass = {
	in: './node_modules/bootstrap-sass/',
};

var fonts = {
	in: [ source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*' ],
	out: dest + 'fonts/'
};

var scss = {
	in: source + 'scss/' + fileSCSSOutput,
	out: dest + 'css/',
	outCss: source + 'css/',
	watch: source + 'scss/**/*',
	sassOpts: {
		outputStyle: 'expanded',
		presicion: 3,
		errLogToConsole: true,
		includePaths: [bootstrapSass.in + 'assets/stylesheets' ]
	},
	outputFile: dest + 'css/' + fileCSSOutput,
};

var js = {
	in: source + 'js/theme/*.js',
	out: dest + 'js/',
	outJsSource: source + 'js/',
	watch: source + 'js/theme/*.js',
	bootstrap: bootstrapSass.in + 'assets/javascripts/bootstrap.min.js',
}

var plumberErrorHandler = { 
	errorHandler: notify.onError({
		title: 'Gulp',
		message: 'Error: <%= error.message %>'
	})
};

/** 
 * task : copy fonts from src to dist 
 */	
gulp.task( 'fonts', function(){
	return gulp
		.src(fonts.in)
		.pipe(gulp.dest(fonts.out));
});	

/** 
 * task : sass compile 
 */
gulp.task( 'sass', ['fonts'], function() {
	return gulp.src( scss.in )
		.pipe( plumber(plumberErrorHandler))
		.pipe( sass( scss.sassOpts ) )
		.pipe( gulp.dest( scss.outCss ) )
		.pipe( minifyCSS() )
		.pipe( rename( { suffix: '.min' }))
		.pipe( gulp.dest( scss.out ) )
		.pipe( livereload() );
});

/**
 * task : js hint 
 */
gulp.task( 'js', function() {
	gulp.src( [ js.bootstrap , js.in ] )
		.pipe( plumber(plumberErrorHandler))
		// .pipe( jshint() )
		// .pipe( jshint.reporter( 'fail' ) )
		.pipe( concat( fileJSOutput ) )
		.pipe( gulp.dest( js.outJsSource ) )
		// add uglify here
		.pipe( uglify() )
		.pipe( rename( { suffix: '.min' }))
		.pipe( gulp.dest( js.out ) )
		.pipe( livereload() );
});

/**
 * task : imagemin 
 */
gulp.task( 'img', function(){
	gulp.src( source + 'img/*.{png,jpg,gif}' )
		.pipe( plumber(plumberErrorHandler))
		.pipe( imagemin({
			optimizationLevel: 7,
			progressive: true
		}))
		.pipe( gulp.dest( dest + 'img'))
		.pipe( livereload() );
});

/**
 * task : watch 
 */
gulp.task( 'watch', function(){
	livereload.listen();
	gulp.watch( scss.watch, ['sass']);
	gulp.watch( js.watch, ['js'] );
	gulp.watch( source+ 'img/*.{png,jpg,gif}', ['img']);
});

/** 
 * default task 
 */
gulp.task( 'default', ['sass', 'js', 'img', 'watch'] );