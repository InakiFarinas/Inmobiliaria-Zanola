<?php
function guardar_imagenes($conexion, $id_propiedad, $file_input) {
    if (!isset($_FILES[$file_input])) return;

    $total = count($_FILES[$file_input]['name']);
    $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    // Ruta absoluta
    $ruta_base = $_SERVER['DOCUMENT_ROOT'] . '/inmobiliaria/public/images/propiedades/';


    for ($i = 0; $i < $total; $i++) {
        if ($_FILES[$file_input]['error'][$i] === UPLOAD_ERR_OK) {
            $nombre_original = $_FILES[$file_input]['name'][$i];
            $ext = strtolower(pathinfo($nombre_original, PATHINFO_EXTENSION));
            if (!in_array($ext, $allowed)) continue; // Omite si no es imagen
            $nombre_final = uniqid('propiedad_') . "." . $ext;
            $ruta_destino = $ruta_base . $nombre_final;

            if (move_uploaded_file($_FILES[$file_input]['tmp_name'][$i], $ruta_destino)) {
                $stmt = $conexion->prepare("INSERT INTO imagenes_propiedad (id_propiedad, ruta_imagen) VALUES (?, ?)");
                $stmt->bind_param("is", $id_propiedad, $nombre_final);
                $stmt->execute();
                $stmt->close();
            }
        }
    }
}