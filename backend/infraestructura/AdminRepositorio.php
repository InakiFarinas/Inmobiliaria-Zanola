<?php
require_once __DIR__ . '/Conexion.php';

class AdminRepositorio {
    public static function obtenerAdminPorUsuario($usuario) {
        $conexion = Conexion::obtenerConexion();

        $stmt = $conexion->prepare("SELECT * FROM administradores WHERE usuario = ?");
        $stmt->bind_param("s", $usuario);
        $stmt->execute();

        $resultado = $stmt->get_result();
        $admin = $resultado->fetch_assoc();

        $stmt->close();

        return $admin;
    }
}