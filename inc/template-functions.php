<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package twcx
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function twcx_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	return $classes;
}
add_filter( 'body_class', 'twcx_body_classes' );

/**
 * Add a pingback url auto-discovery header for singularly identifiable articles.
 */
function twcx_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
	}
}
add_action( 'wp_head', 'twcx_pingback_header' );

/**
 * twcx enqueue styles & scripts
 */
function twcx_enqueue_styles_script(){

	twcx_load_styles();

	twcx_load_scripts();

}
add_action( 'wp_enqueue_scripts', 'twcx_enqueue_styles_script' );

/**
 * template style
 */
function twcx_load_styles(){
	
	wp_enqueue_style( 'twcx-theme-style', get_template_directory_uri() .'/dist/css/twcx-styles.css' );

}

/**
 * template script
 */
function twcx_load_scripts(){

	wp_enqueue_script( 'twcx-theme-script', get_template_directory_uri() .'/dist/js/twcx-scripts.js', array( 'jquery' ), '20170912', true );
	
}