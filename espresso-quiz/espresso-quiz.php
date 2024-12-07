<?php
/*
Plugin Name: Espresso Machine Quiz
Description: Interactive quiz to help users find their perfect espresso machine
Version: 1.0
Author: Your Name
*/

if (!defined('ABSPATH')) exit;

// Enqueue scripts and styles
function eq_enqueue_assets() {
    wp_enqueue_style(
        'espresso-quiz-styles',
        plugins_url('dist/quiz-widget-assets-Ca2Dc-Yr.css', __FILE__),
        [],
        '1.0.0'
    );

    wp_enqueue_script(
        'espresso-quiz-widget',
        plugins_url('dist/quiz-widget.js', __FILE__),
        [],
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'eq_enqueue_assets');

// Initialize Elementor widget
function eq_init_elementor() {
    require_once(__DIR__ . '/elementor/plugin.php');
}
add_action('plugins_loaded', 'eq_init_elementor');

// Register custom post type for espresso machines
function eq_register_machine_post_type() {
    register_post_type('espresso_machine', [
        'labels' => [
            'name' => 'Espresso Machines',
            'singular_name' => 'Espresso Machine',
            'add_new' => 'Add New Machine',
            'add_new_item' => 'Add New Espresso Machine',
            'edit_item' => 'Edit Espresso Machine',
            'view_item' => 'View Espresso Machine'
        ],
        'public' => true,
        'has_archive' => true,
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'show_in_rest' => true,
        'menu_icon' => 'dashicons-coffee'
    ]);

    // Register custom fields
    register_post_meta('espresso_machine', 'price', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ]);
    register_post_meta('espresso_machine', 'skill_level', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ]);
    register_post_meta('espresso_machine', 'space_required', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ]);
    register_post_meta('espresso_machine', 'features', [
        'type' => 'array',
        'single' => true,
        'show_in_rest' => [
            'schema' => [
                'type' => 'array',
                'items' => ['type' => 'string']
            ]
        ]
    ]);
    register_post_meta('espresso_machine', 'affiliate_url', [
        'type' => 'string',
        'single' => true,
        'show_in_rest' => true
    ]);
}
add_action('init', 'eq_register_machine_post_type');

// Add REST API endpoint for quiz data
function eq_register_rest_routes() {
    register_rest_route('espresso-quiz/v1', '/machines', [
        'methods' => 'GET',
        'callback' => 'eq_get_machines',
        'permission_callback' => '__return_true'
    ]);
}
add_action('rest_api_init', 'eq_register_rest_routes');

function eq_get_machines() {
    $args = [
        'post_type' => 'espresso_machine',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    ];

    $machines = [];
    $query = new WP_Query($args);

    while ($query->have_posts()) {
        $query->the_post();
        $machines[] = [
            'id' => get_the_ID(),
            'name' => get_the_title(),
            'description' => get_the_excerpt(),
            'image' => get_the_post_thumbnail_url(),
            'price' => get_post_meta(get_the_ID(), 'price', true),
            'skillLevel' => get_post_meta(get_the_ID(), 'skill_level', true),
            'spaceRequired' => get_post_meta(get_the_ID(), 'space_required', true),
            'features' => get_post_meta(get_the_ID(), 'features', true),
            'affiliateUrl' => get_post_meta(get_the_ID(), 'affiliate_url', true)
        ];
    }

    wp_reset_postdata();
    return $machines;
}