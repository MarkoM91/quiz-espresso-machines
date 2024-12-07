<?php
namespace EspressoQuiz\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

if (!defined('ABSPATH')) exit;

class Quiz_Widget extends Widget_Base {
    public function get_name() {
        return 'espresso_quiz';
    }

    public function get_title() {
        return 'Espresso Quiz';
    }

    public function get_icon() {
        return 'eicon-form-horizontal';
    }

    public function get_categories() {
        return ['general'];
    }

    protected function register_controls() {
        $this->start_controls_section(
            'content_section',
            [
                'label' => 'Content',
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'title_text',
            [
                'label' => 'Title',
                'type' => Controls_Manager::TEXT,
                'default' => 'Not sure if this is the right machine for you?',
            ]
        );

        $this->add_control(
            'description_text',
            [
                'label' => 'Description',
                'type' => Controls_Manager::TEXTAREA,
                'default' => 'Take our quick quiz to find the perfect espresso machine that matches your needs and preferences.',
            ]
        );

        $this->add_control(
            'button_text',
            [
                'label' => 'Button Text',
                'type' => Controls_Manager::TEXT,
                'default' => 'Find Your Perfect Espresso Machine',
            ]
        );

        $this->add_control(
            'show_icon',
            [
                'label' => 'Show Coffee Icon',
                'type' => Controls_Manager::SWITCHER,
                'default' => 'yes',
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'style_section',
            [
                'label' => 'Style',
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'button_background_color',
            [
                'label' => 'Button Color',
                'type' => Controls_Manager::COLOR,
                'default' => '#D4B062',
            ]
        );

        $this->add_control(
            'button_hover_background_color',
            [
                'label' => 'Button Hover Color',
                'type' => Controls_Manager::COLOR,
                'default' => '#C4A052',
            ]
        );

        $this->add_control(
            'container_background_color',
            [
                'label' => 'Container Background',
                'type' => Controls_Manager::COLOR,
                'default' => '#F5F5F5',
            ]
        );

        $this->add_control(
            'border_radius',
            [
                'label' => 'Border Radius',
                'type' => Controls_Manager::SLIDER,
                'size_units' => ['px'],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 50,
                        'step' => 1,
                    ],
                ],
                'default' => [
                    'unit' => 'px',
                    'size' => 8,
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $widget_id = 'espresso-quiz-' . $this->get_id();

        echo sprintf(
            '<div class="espresso-quiz-placeholder" id="%s" 
                data-button-text="%s"
                data-title="%s"
                data-description="%s"
                data-button-color="%s"
                data-button-hover-color="%s"
                data-show-icon="%s"
                data-container-background="%s"
                data-border-radius="%s">
            </div>',
            esc_attr($widget_id),
            esc_attr($settings['button_text']),
            esc_attr($settings['title_text']),
            esc_attr($settings['description_text']),
            esc_attr($settings['button_background_color']),
            esc_attr($settings['button_hover_background_color']),
            esc_attr($settings['show_icon']),
            esc_attr($settings['container_background_color']),
            esc_attr($settings['border_radius']['size'] . $settings['border_radius']['unit'])
        );

        // Initialize the widget with custom options
        echo "<script>
            window.addEventListener('load', function() {
                if (typeof initializeQuizWidget === 'function') {
                    initializeQuizWidget('$widget_id', {
                        buttonStyle: {
                            backgroundColor: '{$settings['button_background_color']}',
                            hoverBackgroundColor: '{$settings['button_hover_background_color']}',
                            borderRadius: '{$settings['border_radius']['size']}{$settings['border_radius']['unit']}'
                        },
                        buttonText: '{$settings['button_text']}',
                        showIcon: '{$settings['show_icon']}' === 'yes',
                        titleText: '{$settings['title_text']}',
                        descriptionText: '{$settings['description_text']}',
                        containerStyle: {
                            backgroundColor: '{$settings['container_background_color']}',
                            borderRadius: '{$settings['border_radius']['size']}{$settings['border_radius']['unit']}'
                        }
                    });
                }
            });
        </script>";
    }
}