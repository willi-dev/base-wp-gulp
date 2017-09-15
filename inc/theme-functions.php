<?php

// define development mode of theme
define( 'THEME_DEV', true );
define( 'THEME_PREFIX', 'twcx');
// define( 'TEMPLATE_DIR', get_template_directory() );

/**
 * twcx enqueue styles & scripts
 * call twcx_load_styles
 * call twcx_load_scripts
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
	$file_use = ( THEME_DEV === true ) ? get_template_directory_uri() . '/assets/src/css/'.THEME_PREFIX.'-styles.css' : get_template_directory_uri() . '/assets/dist/css/'.THEME_PREFIX.'-styles.min.css';
	
	wp_enqueue_style( 'twcx-theme-style', $file_use );
}

/**
 * template script
 */
function twcx_load_scripts(){
	$file_use = ( THEME_DEV === true ) ? get_template_directory_uri() . '/assets/src/js/'.THEME_PREFIX.'-scripts.js' : get_template_directory_uri() .'/assets/dist/js/'.THEME_PREFIX.'-scripts.js';
	
	wp_enqueue_script( 'twcx-theme-script', $file_use , array( 'jquery' ), '20170912', true );
}
