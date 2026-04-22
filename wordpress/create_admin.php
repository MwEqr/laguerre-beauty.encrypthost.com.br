<?php
require_once('wp-load.php');

$user_name = 'admin_laguerre';
$user_password = 'LaguerreAdmin@2024!';
$user_email = 'contato@laguerrebeauty.com.br';

if ( !username_exists( $user_name ) ) {
    $user_id = wp_create_user( $user_name, $user_password, $user_email );
    $user = new WP_User( $user_id );
    $user->set_role( 'administrator' );
    echo "Usuário criado com sucesso! Login: $user_name | Senha: $user_password";
} else {
    echo "Usuário já existe.";
}
unlink(__FILE__);
?>