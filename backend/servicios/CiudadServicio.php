<?php
require_once __DIR__ . '/../infraestructura/CiudadRepositorio.php';

class CiudadServicio {
    public function listarCiudades() {
        return CiudadRepositorio::obtenerTodas();
    }
}
