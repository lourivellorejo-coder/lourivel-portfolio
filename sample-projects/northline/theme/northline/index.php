<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
?>
<main id="main-content" class="container wp-default-content">
<?php if ( have_posts() ) : ?>
    <?php if ( is_home() ) : ?><h1>Journal</h1><?php endif; ?>
    <?php while ( have_posts() ) : the_post(); ?>
        <article><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2><?php if ( is_singular() ) { the_content(); wp_link_pages(); } else { the_excerpt(); } ?></article>
    <?php endwhile; ?>
    <?php the_posts_navigation(); ?>
<?php else : ?><h1>Nothing here yet.</h1><p><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Return home</a></p><?php endif; ?>
</main>
<?php get_footer(); ?>
