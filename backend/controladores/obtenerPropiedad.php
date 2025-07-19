<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../servicios/PropiedadServicio.php';
$propiedad = new PropiedadServicio();
$filtros = [
    'ciudad' => $_GET['ciudad'] ?? null,
    'tipo' => $_GET['tipo'] ?? null,
    'estado' => $_GET['estado'] ?? null,
    'ambientes' => $_GET['ambientes'] ?? null,
    'dormitorios' => $_GET['dormitorios'] ?? null,
    'garaje' => $_GET['garaje'] ?? null,
    'baños' => $_GET['baños'] ?? null,
    'antiguedad' => $_GET['antiguedad'] ?? null,
    'superficie_min' => $_GET['superficie_min'] ?? null,
    'superficie_max' => $_GET['superficie_max'] ?? null,
    'precio_min' => $_GET['precio_min'] ?? null,
    'precio_max' => $_GET['precio_max'] ?? null,
];
echo json_encode($propiedad->obtenerFiltradas($filtros));