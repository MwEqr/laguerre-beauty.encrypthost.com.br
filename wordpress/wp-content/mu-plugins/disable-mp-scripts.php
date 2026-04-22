<?php
add_action('wp_enqueue_scripts', function() {
    wp_dequeue_script('wc-mercadopago-checkout');
    wp_dequeue_script('wc-mercadopago-metrics');
}, 9999);
