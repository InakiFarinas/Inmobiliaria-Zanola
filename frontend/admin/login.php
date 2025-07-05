<!DOCTYPE html>
<html lang="es">
<?php include('../includes/head_admin.php'); ?>
<body>
  <h1>Login Administración</h1>
  <form method="POST" action="../../backend/admin/login.php">
    <input type="text" name="usuario" placeholder="Usuario" required>
    <input type="password" name="contrasena" placeholder="Contraseña" required>
    <button type="submit">Ingresar</button>
  </form>
</body>
</html>