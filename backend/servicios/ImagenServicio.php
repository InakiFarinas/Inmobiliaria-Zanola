<?php
require_once __DIR__ . '/../infraestructura/ImagenRepositorio.php';

class ImagenServicio {
    private $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    public function guardarImagenes($conexion, $id_propiedad, $filesArray) {
        $rutaBase = ImagenRepositorio::obtenerRutaBase();

        $total = count($filesArray['name']);
        for ($i = 0; $i < $total; $i++) {
            if ($filesArray['error'][$i] === UPLOAD_ERR_OK) {
                $nombreOriginal = $filesArray['name'][$i];
                $ext = strtolower(pathinfo($nombreOriginal, PATHINFO_EXTENSION));

                if (!in_array($ext, $this->allowedExtensions)) continue;

                $nombreFinal = uniqid('propiedad_') . "." . $ext;
                $rutaDestino = $rutaBase . $nombreFinal;

                if (move_uploaded_file($filesArray['tmp_name'][$i], $rutaDestino)) {
                    ImagenRepositorio::guardarImagen($conexion, $id_propiedad, $nombreFinal);
                }
            }
        }
    }
}
