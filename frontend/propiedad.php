<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Detalle de propiedad</title>
</head>
<?php include("includes/head.php"); ?>
<body>
  <?php include('includes/header.php'); ?>
  <div id="detalle-propiedad">
    <p>Cargando...</p>
  </div>
  <div id="map" style="height: 400px; width: 50%; margin-bottom: 20px;"></div>
  <?php include('includes/footer.php'); ?>
  <script src="../public/js/propiedades/cargarPropiedadDetalle.js"></script>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
</body>
</html>

