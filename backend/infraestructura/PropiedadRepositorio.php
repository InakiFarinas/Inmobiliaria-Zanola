<?php
require_once __DIR__ . '/Conexion.php';

class PropiedadRepositorio {
    public static function insertarPropiedad(
        $calle, $altura, $precio, $estado, $tipo,
        $ambientes, $garaje, $banos, $descripcion, $id_ciudad
    ) {
        $conexion = Conexion::obtenerConexion();

        $stmt = $conexion->prepare("INSERT INTO propiedades 
            (calle, altura, precio, estado, tipo, ambientes, garaje, baños, descripcion, id_ciudad) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssdssiiisi", $calle, $altura, $precio, $estado, $tipo, $ambientes, $garaje, $banos, $descripcion, $id_ciudad);
        $stmt->execute();

        return $conexion->insert_id;
    }
    public static function obtenerValoresEnumEstado() {
        $conexion = Conexion::obtenerConexion();
        $resultado = $conexion->query("SHOW COLUMNS FROM propiedades LIKE 'estado'");
        $fila = $resultado->fetch_assoc();

        $enum = [];
        if (preg_match("/^enum\((.*)\)$/", $fila['Type'], $matches)) {
            foreach (explode(",", $matches[1]) as $valor) {
                $enum[] = trim($valor, "'");
            }
        }
        return $enum;
    }

    public static function obtenerValoresEnumTipo() {
        $conexion = Conexion::obtenerConexion();
        $resultado = $conexion->query("SHOW COLUMNS FROM propiedades LIKE 'tipo'");
        $fila = $resultado->fetch_assoc();

        $enum = [];
        if (preg_match("/^enum\((.*)\)$/", $fila['Type'], $matches)) {
            foreach (explode(",", $matches[1]) as $valor) {
                $enum[] = trim($valor, "'");
            }
        }
        return $enum;
    }
}
