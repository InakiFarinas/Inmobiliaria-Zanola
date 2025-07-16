<?php
session_start();
require_once __DIR__ . '/../servicios/AdminServicio.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../../frontend/admin/login.php");
    exit;
}

$usuario = $_POST['usuario'] ?? '';
$contrasena = $_POST['contrasena'] ?? '';

$servicio = new AdminServicio();
$admin = $servicio->autenticar($usuario, $contrasena);

if ($admin) {
    $_SESSION['admin'] = $admin['usuario'];
    header("Location: ../../frontend/admin/cargarPropiedades.php");
    exit;
} else {
    header("Location: ../../frontend/admin/login.php?error=1");
    exit;
}
