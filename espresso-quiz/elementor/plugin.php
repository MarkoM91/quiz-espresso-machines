<?php
namespace EspressoQuiz;

if (!defined('ABSPATH')) exit;

class Plugin {
    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action('elementor/widgets/register', [$this, 'register_widgets']);
    }

    public function register_widgets($widgets_manager) {
        require_once(__DIR__ . '/widgets/quiz-widget.php');
        $widgets_manager->register(new Widgets\Quiz_Widget());
    }
}

// Initialize the plugin
Plugin::instance();