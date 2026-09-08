<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
get_header();
?>
<main id="main-content">
<?php while ( have_posts() ) : the_post(); ?>
    <?php if ( get_post_meta( get_the_ID(), '_northline_sample', true ) ) : ?>
        <?php the_content(); ?>
    <?php else : ?>
        <article class="container wp-default-content"><h1><?php the_title(); ?></h1><?php the_content(); ?><?php wp_link_pages(); ?></article>
    <?php endif; ?>
<?php endwhile; ?>
</main>
<?php get_footer(); ?>
