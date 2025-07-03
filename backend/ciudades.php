<?php
include("db.php");
header('Content-Type: application/json');
$resultado = $conexion->query("SELECT nombre FROM ciudades");
$ciudades = [];
while ($fila = $resultado->fetch_assoc()) {
    $ciudades[] = $fila['nombre'];
}
echo json_encode($ciudades);