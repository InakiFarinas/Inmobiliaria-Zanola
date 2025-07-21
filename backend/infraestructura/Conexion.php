<?php
class Conexion {
    private static $conexion = null;

    // Método estático para obtener la conexión única (singleton)
    public static function obtenerConexion() {
        if (self::$conexion === null) {
            $host = "localhost";
            $usuario = "root";
            $contrasena = "";
            $base_datos = "sys_inmobiliaria";

            // Crear nueva conexión mysqli
            self::$conexion = new mysqli($host, $usuario, $contrasena, $base_datos);

            // Verificar si hubo error de conexión
            if (self::$conexion->connect_error) {
                die("Error de conexión: " . self::$conexion->connect_error);
            }

            // Establecer charset UTF-8
            self::$conexion->set_charset("utf8mb4");
        }
        return self::$conexion;
    }
}