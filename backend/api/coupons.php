<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../wordpress/wp-load.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $args = [
        'posts_per_page' => -1,
        'post_type'      => 'shop_coupon',
        'post_status'    => 'publish',
    ];
    $coupons = get_posts($args);
    $formatted = [];
    foreach ($coupons as $c) {
        $coupon = new WC_Coupon($c->ID);
        $formatted[] = [
            'id' => $coupon->get_id(),
            'code' => strtoupper($coupon->get_code()),
            'discount' => (float)$coupon->get_amount(),
            'type' => $coupon->get_discount_type() === 'percent' ? 'percent' : 'fixed_cart',
            'active' => true,
            'date_expires' => $coupon->get_date_expires() ? $coupon->get_date_expires()->date('Y-m-d') : '',
            'minimum_amount' => (float)$coupon->get_minimum_amount(),
            'usage_limit' => $coupon->get_usage_limit()
        ];
    }
    echo json_encode($formatted);
} elseif ($method === 'POST' || $method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $coupon_id = ($method === 'PUT' && !empty($data['id'])) ? (int)$data['id'] : 0;
    $coupon = $coupon_id ? new WC_Coupon($coupon_id) : new WC_Coupon();
    
    if (!empty($data['code'])) $coupon->set_code(strtolower($data['code']));
    if (!empty($data['discount'])) $coupon->set_amount((string)$data['discount']);
    if (!empty($data['type'])) $coupon->set_discount_type($data['type'] === 'percent' ? 'percent' : 'fixed_cart');
    if (isset($data['minimum_amount'])) $coupon->set_minimum_amount((string)$data['minimum_amount']);
    if (!empty($data['usage_limit'])) $coupon->set_usage_limit((int)$data['usage_limit']);
    
    if (!empty($data['date_expires'])) {
        $coupon->set_date_expires($data['date_expires'] . ' 23:59:59');
    } else {
        $coupon->set_date_expires(null);
    }
    
    $coupon->save();
    echo json_encode(["success" => true, "id" => $coupon->get_id()]);
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? 0;
    if ($id) {
        $coupon = new WC_Coupon($id);
        if ($coupon->get_id()) $coupon->delete(true);
        echo json_encode(["success" => true]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "ID missing"]);
    }
}
?>