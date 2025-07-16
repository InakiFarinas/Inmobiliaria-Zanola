<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../servicios/PropiedadServicio.php';

$id = isset($_GET['id']) ? intval($_GET['id']) : null;
if (!$id) {
  echo json_encode(['error' => 'ID inválido']);
  exit;
}

$servicio = new PropiedadServicio();
$propiedad = $servicio->obtenerPorId($id);

if (!$propiedad) {
  echo json_encode(['error' => 'Propiedad no encontrada']);
  exit;
}

echo json_encode($propiedad);
