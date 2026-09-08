<?php if ( ! defined( 'ABSPATH' ) ) { exit; } ?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head><meta charset="<?php bloginfo( 'charset' ); ?>"><meta name="viewport" content="width=device-width, initial-scale=1"><?php wp_head(); ?></head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header"><div class="container header-inner">
<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="Northline home"><svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M6 26V6L26 26V6M6 16H26" stroke="currentColor" stroke-width="3"/></svg><span>NORTHLINE<small>BUSINESS STUDIO</small></span></a>
<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" hidden>Menu <span aria-hidden="true">+</span></button>
<nav class="primary-nav" id="primary-nav" aria-label="Primary navigation"><?php
    if ( has_nav_menu( 'primary' ) ) {
        wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'depth' => 1, 'fallback_cb' => false ) );
    } else { northline_fallback_menu(); }
?><a class="nav-cta" href="<?php echo esc_url( northline_page_url( 'contact' ) ); ?>">Let’s talk <span aria-hidden="true">↗</span></a></nav>
</div></header>
