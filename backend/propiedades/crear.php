<?php
require '../db.php';
require_once '../imagenes/subir.php';

$errores = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $calle = $_POST['calle'] ?? '';
    $altura = $_POST['altura'] ?? '';
    $precio = $_POST['precio'] ?? '';
    $estado = $_POST['estado'] ?? '';
    $tipo = $_POST['tipo'] ?? '';
    $ambientes = $_POST['ambientes'] ?? 0;
    $garaje = isset($_POST['garaje']) ? 1 : 0;
    $baños = $_POST['baños'] ?? 0;
    $descripcion = $_POST['descripcion'] ?? '';
    $id_ciudad = $_POST['id_ciudad'] ?? null;

    // Validación básica
    if ($calle && $altura && $precio && $estado && $tipo && $id_ciudad) {
        $stmt = $conexion->prepare("INSERT INTO propiedades 
            (calle, altura, precio, estado, tipo, ambientes, garaje, baños, descripcion,id_ciudad) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdssiiisi", $calle, $altura, $precio, $estado, $tipo, $ambientes, $garaje, $baños, $descripcion, $id_ciudad);
        $stmt->execute();
        // Obtener el ID de la propiedad recién creada
        $id_propiedad = $conexion->insert_id;
        // Guardar imágenes si se enviaron
        guardar_imagenes($conexion, $id_propiedad, 'imagenes');
        // Devolver un mensaje de éxito
        echo json_encode(['success' => true]);
        exit;
    } else {
        $errores[] = "Completá todos los campos obligatorios.";
        echo json_encode(['success' => false, 'errores' => $errores]);
        exit;
    }
}
