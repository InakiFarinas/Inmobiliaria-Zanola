<?php
require_once __DIR__ . '/Conexion.php';

class CiudadRepositorio {
    public static function obtenerTodas() {
        $conexion = Conexion::obtenerConexion();
        $resultado = $conexion->query("SELECT * FROM ciudades");

        $ciudades = [];
        while ($fila = $resultado->fetch_assoc()) {
            $ciudades[] = $fila;
        }

        return $ciudades;
    }
}
