<?php
class ImagenRepositorio {
    public static function guardarImagen($conexion, $id_propiedad, $nombreArchivo) {
        $stmt = $conexion->prepare("INSERT INTO imagenes_propiedad (id_propiedad, ruta_imagen) VALUES (?, ?)");
        $stmt->bind_param("is", $id_propiedad, $nombreArchivo);
        $stmt->execute();
        $stmt->close();
    }
    public static function obtenerPorPropiedad($id_propiedad) {
        $conexion = Conexion::obtenerConexion();
        $stmt = $conexion->prepare("SELECT ruta_imagen FROM imagenes_propiedad WHERE id_propiedad = ?");
        $stmt->bind_param("i", $id_propiedad);
        $stmt->execute();
        $resultado = $stmt->get_result();

        $imagenes = [];
        while ($fila = $resultado->fetch_assoc()) {
            $imagenes[] = $fila['ruta_imagen'];
        }
        return $imagenes;
    }

    public static function obtenerRutaBase() {
        return $_SERVER['DOCUMENT_ROOT'] . '/inmobiliaria/public/images/propiedades/';
    }
}
