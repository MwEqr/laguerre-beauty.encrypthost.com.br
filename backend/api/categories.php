<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../wordpress/wp-load.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $terms = get_terms([
        'taxonomy'   => 'product_cat',
        'hide_empty' => false,
    ]);
    $categories = [];
    if (!is_wp_error($terms)) {
        foreach ($terms as $term) {
            $categories[] = [
                'id' => $term->term_id,
                'name' => $term->name,
                'count' => $term->count
            ];
        }
    }
    echo json_encode($categories);
} elseif ($method === 'POST' || $method === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!empty($data['name'])) {
        $term_id = ($method === 'PUT' && !empty($data['id'])) ? (int)$data['id'] : 0;
        
        if ($term_id) {
            $result = wp_update_term($term_id, 'product_cat', ['name' => $data['name']]);
        } else {
            $result = wp_insert_term($data['name'], 'product_cat');
        }

        if (is_wp_error($result)) {
            http_response_code(400);
            echo json_encode(["error" => $result->get_error_message()]);
        } else {
            echo json_encode(["success" => true, "id" => $result['term_id']]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Name missing"]);
    }
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? 0;
    if ($id) {
        $result = wp_delete_term($id, 'product_cat');
        if (is_wp_error($result) || !$result) {
            http_response_code(400);
            echo json_encode(["error" => "Failed to delete"]);
        } else {
            echo json_encode(["success" => true]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "ID missing"]);
    }
}
?>