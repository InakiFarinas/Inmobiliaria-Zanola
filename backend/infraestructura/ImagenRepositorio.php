<?php
class ImagenRepositorio {
    public static function guardarImagen($conexion, $id_propiedad, $nombreArchivo) {
        $stmt = $conexion->prepare("INSERT INTO imagenes_propiedad (id_propiedad, ruta_imagen) VALUES (?, ?)");
        $stmt->bind_param("is", $id_propiedad, $nombreArchivo);
        $stmt->execute();
        $stmt->close();
    }

    public static function obtenerRutaBase() {
        return $_SERVER['DOCUMENT_ROOT'] . '/inmobiliaria/public/images/propiedades/';
    }
}
