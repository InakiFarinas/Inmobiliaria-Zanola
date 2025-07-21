<?php
require_once __DIR__ . '/../servicios/CiudadServicio.php';

header('Content-Type: application/json');
$servicio = new CiudadServicio();
$ciudades = $servicio->listarCiudades();
echo json_encode($ciudades);