<!DOCTYPE html>
<html lang="es">
<?php include('../includes/head_admin.php'); ?>
<body class="login-body">
  <form method="POST" action="../../backend/controladores/loginAdmin.php" class="login-form">
    <h1 class="login-title">Iniciar Sesión</h1>
    <input type="text" name="usuario" placeholder="Usuario" required class="login-input">
    <input type="password" name="contrasena" placeholder="Contrasena" required class="login-input">
    <button type="submit" class="login-button">Ingresar</button>
  </form>
</body>
</html>