<?php
/** Northline theme functions. */
if ( ! defined( 'ABSPATH' ) ) { exit; }

function northline_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
    register_nav_menus( array( 'primary' => __( 'Primary navigation', 'northline' ) ) );
}
add_action( 'after_setup_theme', 'northline_setup' );

function northline_assets() {
    wp_enqueue_style( 'northline-style', get_stylesheet_uri(), array(), '1.0.0' );
    wp_enqueue_script( 'northline-script', get_theme_file_uri( '/assets/site.js' ), array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'northline_assets' );

function northline_page_url( $slug ) {
    if ( 'home' === $slug ) { return home_url( '/' ); }
    $page = get_page_by_path( $slug, OBJECT, 'page' );
    return $page ? get_permalink( $page ) : home_url( '/?pagename=' . rawurlencode( $slug ) );
}

/** Resolve portable demo links while keeping imported Pages editable. */
function northline_resolve_tokens( $content ) {
    if ( false === strpos( $content, '{{' ) ) { return $content; }
    $content = str_replace( '{{asset}}', esc_url( get_theme_file_uri( '/assets' ) ), $content );
    return preg_replace_callback( '/\{\{url:(home|about|services|contact)\}\}/', function ( $match ) {
        return esc_url( northline_page_url( $match[1] ) );
    }, $content );
}
add_filter( 'the_content', 'northline_resolve_tokens', 9 );

function northline_fallback_menu() {
    foreach ( array( 'home' => 'Home', 'about' => 'About', 'services' => 'Services', 'contact' => 'Contact' ) as $slug => $title ) {
        $current = ( 'home' === $slug ) ? is_front_page() : is_page( $slug );
        printf( '<a href="%s"%s>%s</a>', esc_url( northline_page_url( $slug ) ), $current ? ' aria-current="page"' : '', esc_html( $title ) );
    }
}

function northline_admin_menu() {
    add_theme_page( 'Northline sample setup', 'Northline sample setup', 'manage_options', 'northline-setup', 'northline_setup_screen' );
}
add_action( 'admin_menu', 'northline_admin_menu' );

function northline_setup_screen() {
    if ( ! current_user_can( 'manage_options' ) ) { return; }
    ?>
    <div class="wrap"><h1>Northline sample setup</h1>
    <?php if ( isset( $_GET['northline_imported'] ) ) : ?>
        <div class="notice notice-success"><p>The four sample pages are ready. <a href="<?php echo esc_url( home_url( '/' ) ); ?>">View your site</a>.</p></div>
    <?php endif; ?>
    <p>Northline is a fictional business for a portfolio demonstration. The contact form is a preview and does not send or store messages.</p>
    <p>This optional setup creates Home, About, Services, and Contact, and sets Home as the front page. Use a fresh WordPress demo installation. Pages with matching slugs that were not created by this theme will not be overwritten.</p>
    <form action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" method="post">
        <input type="hidden" name="action" value="northline_install_sample">
        <?php wp_nonce_field( 'northline_install_sample' ); ?>
        <?php submit_button( 'Create the four sample pages' ); ?>
    </form>
    <p>Edit the imported content under Pages. Each page uses a Custom HTML block, so a separate page builder is not required. Navigation can be replaced under Appearance → Menus.</p>
    </div>
    <?php
}

function northline_install_sample() {
    if ( ! current_user_can( 'manage_options' ) ) { wp_die( 'Administrator access is required.', '', array( 'response' => 403 ) ); }
    check_admin_referer( 'northline_install_sample' );
    $pages = array( 'home' => 'Home', 'about' => 'About', 'services' => 'Services', 'contact' => 'Contact' );
    $existing = array();
    foreach ( $pages as $slug => $title ) {
        $page = get_page_by_path( $slug, OBJECT, 'page' );
        if ( $page && ! get_post_meta( $page->ID, '_northline_sample', true ) ) {
            wp_die( esc_html( 'Setup stopped: an existing page uses the slug "' . $slug . '". Use a fresh demo installation or rename that page before trying again.' ) );
        }
        if ( ! is_readable( get_theme_file_path( '/sample-content/' . $slug . '.html' ) ) ) { wp_die( 'A sample content file is missing. Reinstall the complete theme ZIP.' ); }
        $existing[ $slug ] = $page ? $page->ID : 0;
    }
    foreach ( $pages as $slug => $title ) {
        if ( $existing[ $slug ] ) { continue; }
        $markup = file_get_contents( get_theme_file_path( '/sample-content/' . $slug . '.html' ) );
        $id = wp_insert_post( wp_slash( array(
            'post_title' => $title,
            'post_name' => $slug,
            'post_type' => 'page',
            'post_status' => 'publish',
            'post_content' => "<!-- wp:html -->\n" . $markup . "\n<!-- /wp:html -->",
            'meta_input' => array( '_northline_sample' => 1 ),
        ) ), true );
        if ( is_wp_error( $id ) ) { wp_die( esc_html( $id->get_error_message() ) ); }
        $existing[ $slug ] = $id;
    }
    update_option( 'show_on_front', 'page' );
    update_option( 'page_on_front', $existing['home'] );
    wp_safe_redirect( admin_url( 'themes.php?page=northline-setup&northline_imported=1' ) );
    exit;
}
add_action( 'admin_post_northline_install_sample', 'northline_install_sample' );
