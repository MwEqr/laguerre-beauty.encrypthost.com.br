<?php
$host = '127.0.0.1';
$dbname = 'laguerre_beauty_db';
$username = 'bot_encrypt';
$password = 'Bot@Encrypt2024!';

// WooCommerce API Credentials
define('WC_CONSUMER_KEY', 'admin_laguerre');
define('WC_CONSUMER_SECRET', 'bJmXMektjJ9afACUZihRrBSU');

// URL REAL DA VPS PARA O WOOCOMMERCE
define('WC_STORE_URL', 'https://laguerre-beauty.encrypthost.com.br/wordpress');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Falha na conexao com o banco", "details" => $e->getMessage()]);
    exit;
}
?>