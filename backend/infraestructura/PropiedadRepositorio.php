<?php
require_once __DIR__ . '/Conexion.php';

class PropiedadRepositorio {
    public static function insertarPropiedad(
        $calle, $altura, $precio, $estado, $tipo,
        $ambientes,$dormitorios, $garaje, $banos, $descripcion,$superficie,$antiguedad, $id_ciudad
    ) {
        $conexion = Conexion::obtenerConexion();

        $stmt = $conexion->prepare("INSERT INTO propiedades 
            (calle, altura, precio, estado, tipo, ambientes,dormitorios, garaje, banos, descripcion,superficie,antiguedad, id_ciudad) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssissiiiisisi", $calle, $altura, $precio, $estado, $tipo, $ambientes,$dormitorios, $garaje, $banos, $descripcion,$superficie,$antiguedad, $id_ciudad);
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
                p.*,
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
    public static function listarUltimas($limite = 5) {
        $conexion = Conexion::obtenerConexion();
        $query = "SELECT p.*, c.nombre AS ciudad 
                FROM propiedades p
                JOIN ciudades c ON p.id_ciudad = c.id_ciudad
                ORDER BY p.id_propiedad DESC 
                LIMIT ?";
        $stmt = $conexion->prepare($query);
        $stmt->bind_param("i", $limite);
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
    public static function listarFiltradas($filtros) {
    $conexion = Conexion::obtenerConexion();

    $query = "SELECT p.*, c.nombre AS ciudad FROM propiedades p JOIN ciudades c ON p.id_ciudad = c.id_ciudad";

    $condiciones = [];
    $parametros = [];
    $tipos = "";

    $mapaFiltros = [
        'ciudad' => ['campo' => 'p.id_ciudad', 'tipo' => 'i'],
        'tipo' => ['campo' => 'p.tipo', 'tipo' => 's'],
        'estado' => ['campo' => 'p.estado', 'tipo' => 's'],
        'ambientes' => ['campo' => 'p.ambientes', 'tipo' => 'i'],
        'dormitorios' => ['campo' => 'p.dormitorios', 'tipo' => 'i'],
        'garaje' => ['campo' => 'p.garaje', 'tipo' => 'i'],
        'banos' => ['campo' => 'p.banos', 'tipo' => 'i'],
        'antiguedad' => ['campo' => 'p.antiguedad', 'tipo' => 'i'],
        'superficie_min' => ['campo' => 'p.superficie >=', 'tipo' => 'i'],
        'superficie_max' => ['campo' => 'p.superficie <=', 'tipo' => 'i'],
        'precio_min' => ['campo' => 'p.precio >=', 'tipo' => 'i'],
        'precio_max' => ['campo' => 'p.precio <=', 'tipo' => 'i'],
    ];

    if (
        isset($filtros['precio_min'], $filtros['precio_max']) &&
        $filtros['precio_min'] !== '' && $filtros['precio_max'] !== '' &&
        (int)$filtros['precio_min'] > (int)$filtros['precio_max']
    ) {
        return []; // Validación temprana
    }
    if (
        isset($filtros['superficie_min'], $filtros['superficie_max']) &&
        $filtros['superficie_min'] !== '' && $filtros['superficie_max'] !== '' &&
        (int)$filtros['superficie_min'] > (int)$filtros['superficie_max']
    ) {
        return []; // Validación temprana
    }

    foreach ($mapaFiltros as $clave => $info) {
        if (isset($filtros[$clave]) && $filtros[$clave] !== '') {
            // Si el campo ya tiene un operador (>=, <=), no agregues '='
            if (strpos($info['campo'], '>=') !== false || strpos($info['campo'], '<=') !== false) {
                $condiciones[] = "{$info['campo']} ?";
            } else {
                $condiciones[] = "{$info['campo']} = ?";
            }
            $tipos .= $info['tipo'];
            $parametros[] = $info['tipo'] === 'i' ? (int)$filtros[$clave] : $filtros[$clave];
        }
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
