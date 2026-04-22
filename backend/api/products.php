<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../wordpress/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/image.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $products = wc_get_products(['status' => 'publish', 'limit' => -1]);
    $formatted = [];
    foreach ($products as $p) {
        $sizes = [];
        $colors = [];
        $attributes = $p->get_attributes();
        if (isset($attributes['tamanho'])) $sizes = $attributes['tamanho']->get_options();
        if (isset($attributes['cor'])) $colors = $attributes['cor']->get_options();

        $cat_ids = $p->get_category_ids();
        $cat_name = 'Geral';
        $cat_id = null;
        if (!empty($cat_ids)) {
            $cat_id = $cat_ids[0];
            $term = get_term($cat_id, 'product_cat');
            if ($term && !is_wp_error($term)) $cat_name = $term->name;
        }

        $image_id = $p->get_image_id();
        $image_url = $image_id ? wp_get_attachment_url($image_id) : '';
        
        $gallery_ids = $p->get_gallery_image_ids();
        $images = [$image_url];
        foreach ($gallery_ids as $gid) {
            if ($url = wp_get_attachment_url($gid)) $images[] = $url;
        }
        
        if (!$image_url) {
             $image_url = 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=500&auto=format&fit=crop';
             $images = [$image_url];
        }

        $formatted[] = [
            'id' => $p->get_id(),
            'name' => $p->get_name(),
            'price' => (float)($p->get_price() ?: $p->get_regular_price()),
            'oldPrice' => $p->get_sale_price() ? (float)$p->get_regular_price() : null,
            'sale_price' => $p->get_sale_price() ? (float)$p->get_sale_price() : null,
            'category' => $cat_name,
            'categoryId' => $cat_id,
            'image' => $image_url,
            'images' => array_values(array_unique(array_filter($images))),
            'rating' => (float)$p->get_average_rating(),
            'reviews' => $p->get_review_count(),
            'sizes' => empty($sizes) ? [] : $sizes,
            'colors' => empty($colors) ? [] : $colors,
            'description' => strip_tags($p->get_description()),
            'tag' => $p->is_on_sale() ? 'Promoção' : null
        ];
    }
    echo json_encode($formatted);
} elseif ($method === 'POST' || $method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $product_id = ($method === 'PUT' && !empty($data['id'])) ? (int)$data['id'] : 0;
    $product = $product_id ? wc_get_product($product_id) : new WC_Product_Simple();
    
    if (!$product) {
        http_response_code(404);
        echo json_encode(["error" => "Produto nao encontrado"]);
        exit;
    }

    if (!empty($data['name'])) $product->set_name($data['name']);
    if (isset($data['price'])) $product->set_regular_price((string)$data['price']);
    if (isset($data['sale_price'])) $product->set_sale_price((string)$data['sale_price']);
    if (isset($data['description'])) $product->set_description($data['description']);
    if (!empty($data['categoryId'])) $product->set_category_ids([(int)$data['categoryId']]);
    
    // Handle Images
    if (!empty($data['images']) && is_array($data['images'])) {
        $attachment_ids = [];
        foreach ($data['images'] as $url) {
            // Check if URL is local
            if (strpos($url, 'laguerre-beauty.encrypthost.com.br') !== false) {
                // It's our own URL, try to import to media library
                $id = media_sideload_image($url, 0, null, 'id');
                if (!is_wp_error($id)) $attachment_ids[] = $id;
            }
        }
        if (!empty($attachment_ids)) {
            $product->set_image_id($attachment_ids[0]);
            if (count($attachment_ids) > 1) {
                $product->set_gallery_image_ids(array_slice($attachment_ids, 1));
            }
        }
    } elseif (!empty($data['image'])) {
        $url = $data['image'];
        if (strpos($url, 'laguerre-beauty.encrypthost.com.br') !== false) {
            $id = media_sideload_image($url, 0, null, 'id');
            if (!is_wp_error($id)) $product->set_image_id($id);
        }
    }

    $product->save();
    echo json_encode(["success" => true, "id" => $product->get_id()]);
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? 0;
    if ($id) {
        $product = wc_get_product($id);
        if ($product) $product->delete(true);
        echo json_encode(["success" => true]);
    } else {
        http_response_code(400);
        echo json_encode(["error" => "ID missing"]);
    }
}
?>