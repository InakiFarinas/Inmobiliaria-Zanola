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
    public static function listarTodas() {
        $conexion = Conexion::obtenerConexion();
        $sql = "SELECT p.*, c.nombre AS ciudad 
                FROM propiedades p
                JOIN ciudades c ON p.id_ciudad = c.id_ciudad";
        $resultado = $conexion->query($sql);

        $propiedades = [];
        while ($fila = $resultado->fetch_assoc()) {
            $id = $fila['id_propiedad'];

            // Obtener imágenes asociadas
            $imagenes = [];
            $resImg = $conexion->query("SELECT ruta_imagen FROM imagenes_propiedad WHERE id_propiedad = $id");
            while ($img = $resImg->fetch_assoc()) {
                $imagenes[] = $img['ruta_imagen'];
            }

            $fila['imagenes'] = $imagenes;
            $propiedades[] = $fila;
        }
        return $propiedades;
    }
    public static function buscarPorId($id) {
        $conexion = Conexion::obtenerConexion();
        $stmt = $conexion->prepare("
            SELECT 
                p.id_propiedad, p.calle, p.altura, p.precio, p.estado, p.tipo,
                p.ambientes, p.garaje, p.baños, p.descripcion, p.fecha_publicacion,
                c.nombre AS ciudad
            FROM propiedades p
            JOIN ciudades c ON p.id_ciudad = c.id_ciudad
            WHERE p.id_propiedad = ?
        ");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $resultado = $stmt->get_result();
        return $resultado->fetch_assoc();
    }
    public static function listarFiltradas($filtros) {
        $conexion = Conexion::obtenerConexion();

        $query = "SELECT p.*, c.nombre AS ciudad 
                FROM propiedades p 
                JOIN ciudades c ON p.id_ciudad = c.id_ciudad";
        
        $condiciones = [];
        $parametros = [];
        $tipos = "";

        if (!empty($filtros['ciudad'])) {
            $condiciones[] = "p.id_ciudad = ?";
            $tipos .= "i";
            $parametros[] = $filtros['ciudad'];
        }

        if (!empty($filtros['tipo'])) {
            $condiciones[] = "p.tipo = ?";
            $tipos .= "s";
            $parametros[] = $filtros['tipo'];
        }

        if (!empty($filtros['estado'])) {
            $condiciones[] = "p.estado = ?";
            $tipos .= "s";
            $parametros[] = $filtros['estado'];
        }

        if ($condiciones) {
            $query .= " WHERE " . implode(" AND ", $condiciones);
        }

        $stmt = $conexion->prepare($query);

        if (!empty($parametros)) {
            $stmt->bind_param($tipos, ...$parametros);
        }

        $stmt->execute();
        $resultado = $stmt->get_result();

        $propiedades = [];

        while ($fila = $resultado->fetch_assoc()) {
            $imagenes = [];
            $resImg = $conexion->query("SELECT ruta_imagen FROM imagenes_propiedad WHERE id_propiedad = {$fila['id_propiedad']}");
            while ($img = $resImg->fetch_assoc()) {
                $imagenes[] = $img['ruta_imagen'];
            }
            $fila['imagenes'] = $imagenes;
            $propiedades[] = $fila;
        }

        return $propiedades;
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
