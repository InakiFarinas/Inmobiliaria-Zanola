<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../servicios/PropiedadServicio.php';
require_once __DIR__ . '/../servicios/ImagenServicio.php';

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Método no permitido");
    }

    $propiedadServicio = new PropiedadServicio();
    $imagenServicio = new ImagenServicio();

    $idPropiedad = $propiedadServicio->crearPropiedad($_POST, $_FILES);

    if (!empty($_FILES['imagenes'])) {
        $imagenServicio->guardarImagenes(
            Conexion::obtenerConexion(),
            $idPropiedad,
            $_FILES['imagenes']
        );
    }

    echo json_encode(['success' => true, 'id_propiedad' => $idPropiedad]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'errores' => [$e->getMessage()]]);
}
