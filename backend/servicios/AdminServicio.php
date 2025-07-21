<?php
require_once __DIR__ . '/../infraestructura/AdminRepositorio.php';

class AdminServicio {
    public function autenticar($usuario, $contrasena) {
        $admin = AdminRepositorio::obtenerAdminPorUsuario($usuario);

        if ($admin && password_verify($contrasena, $admin['contrasena'])) {
            return $admin;
        }
        return null;
    }
}