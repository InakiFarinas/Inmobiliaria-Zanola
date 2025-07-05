<?php
session_start();
require '../db.php';

$usuario = $_POST['usuario'] ?? '';
$contrasena = $_POST['contrasena'] ?? '';

$stmt = $conexion->prepare("SELECT * FROM administradores WHERE usuario = ?");
$stmt->bind_param("s", $usuario);
$stmt->execute();
$result = $stmt->get_result();
$admin = $result->fetch_assoc();

if ($admin && password_verify($contrasena, $admin['contraseña'])) {
    $_SESSION['admin'] = $admin['usuario'];
    header("Location: ../../frontend/admin/cargarPropiedades.php");
    exit;
} else {
    // Puedes redirigir con error o mostrar mensaje
    header("Location: ../../frontend/admin/login.php?error=1");
    exit;
}