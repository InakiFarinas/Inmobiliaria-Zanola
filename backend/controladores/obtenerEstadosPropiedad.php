<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../servicios/PropiedadServicio.php';

$servicio = new PropiedadServicio();
$valoresEnum = $servicio->obtenerValoresEnumEstado();

echo json_encode($valoresEnum);
