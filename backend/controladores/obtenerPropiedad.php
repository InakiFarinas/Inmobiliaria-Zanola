<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../servicios/PropiedadServicio.php';

$propiedad = new PropiedadServicio();
$filtros = [
    'ciudad' => $_GET['ciudad'] ?? null,
    'tipo' => $_GET['tipo'] ?? null,
    'estado' => $_GET['estado'] ?? null
];
echo json_encode($propiedad->obtenerFiltradas($filtros));