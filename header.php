<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package twcx
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<div id="page" class="site twcx-site">
		<!-- <a class="skip-link screen-reader-text" href="#content"><?php //esc_html_e( 'Skip to content', 'twcx' ); ?></a> -->
	
		<header id="masthead" class="twcx-header site-header">
			<nav class="navbar twcx-navbar" role="navigation"> 
				<!-- Brand and toggle get grouped for better mobile display --> 
				<div class="container">
					<div class="twcx-navbar__header twcx-navbar__inner navbar-header"> 
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse"> 
							<span class="sr-only">Toggle navigation</span> 
							<span class="icon-bar"></span> 
							<span class="icon-bar"></span> 
							<span class="icon-bar"></span> 
						</button> 
						<a class="navbar-brand" href="<?php echo esc_url( home_url( '/' ) );?>">
							<?php// bloginfo( 'name' );?>
							<img src="<?php echo get_template_directory_uri();?>/assets/src/img/TWCX-mono-120x70.png" alt="TWCX" class="twcx-navbar__logo">
						</a> 
					</div> 
					<!-- Collect the nav links, forms, and other content for toggling --> 
					
					<div class="twcx-navbar__collapse twcx-navbar__inner collapse navbar-collapse navbar-main-collapse">
					<?php
						$args_menu = array( 
								'theme_location' 	=> 'menu-1',
								'menu_class'        => 'nav navbar-nav navbar-right', 
								'menu_id'           => 'twcx-main-menu',
								// 'container_class'   => 'collapse navbar-collapse navbar-main-collapse', 
								'container'			=> 'ul',
							);
						wp_nav_menu( $args_menu );
					?>
					</div>
				</div>
			</nav>
		</header><!-- #masthead -->
		<div id="content" class="site-content  container">
