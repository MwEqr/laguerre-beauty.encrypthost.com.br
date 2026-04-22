<?php
// Script para gerar chaves de API e adicionar categorias/produtos via código
require_once('wp-load.php');

if (!class_exists('WC_API_Keys')) {
    echo json_encode(["error" => "WooCommerce not ready"]);
    exit;
}

// Criar Chaves da API Rest (Leitura e Gravação)
global $wpdb;
$user_id = 1; // admin_laguerre

$description = 'Laguerre Backend API';
$permissions = 'read_write';

// Gerar as chaves
$consumer_key    = 'ck_' . wc_rand_hash();
$consumer_secret = 'cs_' . wc_rand_hash();

$wpdb->insert(
    $wpdb->prefix . 'woocommerce_api_keys',
    array(
        'user_id'         => $user_id,
        'description'     => $description,
        'permissions'     => $permissions,
        'consumer_key'    => wc_api_hash( $consumer_key ),
        'consumer_secret' => $consumer_secret,
        'truncated_key'   => substr( $consumer_key, -7 )
    )
);

// Adicionar Produtos Teste
$product1 = new WC_Product_Simple();
$product1->set_name( 'Batom Matte Red Passion' );
$product1->set_regular_price( '110.00' );
$product1->set_sale_price( '89.90' );
$product1->set_description( 'O Batom Matte Red Passion da Laguerre Beauty oferece uma cobertura impecável, alta pigmentação e conforto extremo.' );
$product1->save();

$product2 = new WC_Product_Simple();
$product2->set_name( 'Sérum Facial Rejuvenescedor' );
$product2->set_regular_price( '149.00' );
$product2->set_description( 'Sérum de alta performance com ativos naturais para rejuvenescimento facial.' );
$product2->save();

$product3 = new WC_Product_Simple();
$product3->set_name( 'Paleta de Sombras Golden' );
$product3->set_regular_price( '159.90' );
$product3->set_sale_price( '129.90' );
$product3->set_description( 'Paleta com 12 cores super pigmentadas para looks incríveis.' );
$product3->save();

// Retornar as chaves
echo json_encode([
    "consumer_key" => $consumer_key,
    "consumer_secret" => $consumer_secret
]);
unlink(__FILE__);
?>