<?php include("../backend/db.php"); ?>
<?php $titulo = "Propiedades"; ?>
<!DOCTYPE html>
<html lang="es">
<?php include("includes/head.php"); ?>
<body>
  <?php include("includes/header.php"); ?>
  <main>
    <h1>Listado de Propiedades</h1>
    <div class="contenido-flex">
      <form method="get" class="filtros">
        <select name="tipo" id="tipo-select">
          <option value="">Todos los tipos</option>
        </select>

        <select name="ciudad" id="ciudad-select">
          <option value="">Todas las ciudades</option>
        </select>

        <button type="submit">Filtrar</button>
      </form>

      <div id="listado-propiedades">
      </div>
    </div>
  </main>
  <?php include("includes/footer.php"); ?>
  <script src="../public/js/propiedades/cargarCiudades.js"></script>
  <script src="../public/js/propiedades/cargarTipoPropiedades.js"></script>
</body>
</html>

