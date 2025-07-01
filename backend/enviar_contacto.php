<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST["nombre"]);
    $email = filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);
    $mensaje = htmlspecialchars($_POST["mensaje"]);

    if ($email) {
        $to = "tu-correo@ejemplo.com";
        $subject = "Nuevo mensaje de contacto";
        $body = "Nombre: $nombre\nEmail: $email\nMensaje:\n$mensaje";
        $headers = "From: $email";

        if (mail($to, $subject, $body, $headers)) {
            echo "Mensaje enviado correctamente.";
        } else {
            echo "Error al enviar el mensaje.";
        }
    } else {
        echo "Correo inválido.";
    }
}
?>