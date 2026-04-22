<?php
require_once('wp-load.php');
global $wpdb;
$consumer_key = 'ck_' . wp_generate_password(40, false);
$consumer_secret = 'cs_' . wp_generate_password(40, false);
$wpdb->insert(
    $wpdb->prefix . 'woocommerce_api_keys',
    array(
        'user_id' => 1,
        'description' => 'Laguerre Backend',
        'permissions' => 'read_write',
        'consumer_key' => hash_hmac('sha256', $consumer_key, 'wc-api'),
        'consumer_secret' => $consumer_secret,
        'truncated_key' => substr($consumer_key, -7)
    )
);
echo json_encode(["key" => $consumer_key, "secret" => $consumer_secret]);
