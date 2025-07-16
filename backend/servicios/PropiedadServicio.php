<?php
require_once __DIR__ . '/../infraestructura/PropiedadRepositorio.php';

class PropiedadServicio {
    
    public function crearPropiedad($datos, $archivos) {
        // Validación básica (podés mejorarla o hacerla en otro método)
        $camposRequeridos = ['calle', 'altura', 'precio', 'estado', 'tipo', 'id_ciudad'];
        foreach ($camposRequeridos as $campo) {
            if (empty($datos[$campo])) {
                throw new Exception("El campo $campo es obligatorio.");
            }
        }

        $calle = $datos['calle'];
        $altura = $datos['altura'];
        $precio = $datos['precio'];
        $estado = $datos['estado'];
        $tipo = $datos['tipo'];
        $ambientes = isset($datos['ambientes']) ? (int)$datos['ambientes'] : 0;
        $garaje = isset($datos['garaje']) && $datos['garaje'] ? 1 : 0;
        $banos = isset($datos['baños']) ? (int)$datos['baños'] : 0;
        $descripcion = $datos['descripcion'] ?? '';
        $id_ciudad = $datos['id_ciudad'];

        // Insertar propiedad en BD
        $id_propiedad = PropiedadRepositorio::insertarPropiedad(
            $calle, $altura, $precio, $estado, $tipo,
            $ambientes, $garaje, $banos, $descripcion, $id_ciudad
        );

        // Guardar imágenes si las hay
        if (!empty($archivos['imagenes'])) {
            guardar_imagenes(Conexion::obtenerConexion(), $id_propiedad, $archivos['imagenes']);
        }

        return $id_propiedad;
    }

    public function obtenerValoresEnumEstado() {
        return PropiedadRepositorio::obtenerValoresEnumEstado();
    }

    public function obtenerValoresEnumTipo() {
        return PropiedadRepositorio::obtenerValoresEnumTipo();
    }
}
