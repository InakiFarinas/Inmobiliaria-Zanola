<?php
require_once __DIR__ . '/../servicios/CiudadServicio.php';

header('Content-Type: application/json');
$servicio = new CiudadServicio();
echo json_encode($servicio->listarCiudades());