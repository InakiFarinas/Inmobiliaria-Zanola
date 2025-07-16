<?php $titulo = "Propiedades"; ?>
<!DOCTYPE html>
<html lang="es">
<?php include("includes/head.php"); ?>
<body>
  <?php include("includes/header.php"); ?>
  <main>
    <h1>Listado de Propiedades</h1>
    <div class="contenido-flex">
      <form id="form-filtros" method="get" class="filtros">
        <select name="tipo" id="tipo-select">
          <option value="">Todos los tipos</option>
          <!-- Opciones cargadas por JS -->
        </select>

        <select name="estado" id="estado-select">
          <option value="">Todos los estados</option>
          <!-- Opciones cargadas por JS -->
        </select>

        <select name="ciudad" id="ciudad-select">
          <option value="">Todas las ciudades</option>
          <!-- Opciones cargadas por JS -->
        </select>

        <button type="submit">Filtrar</button>
      </form>
      <div id="propiedades-listado" class="contenedor-propiedades"></div>
    </div>
  </main>
  <?php include("includes/footer.php"); ?>
  <script src="../public/js/propiedades/cargarCiudades.js"></script>
  <script src="../public/js/propiedades/cargarTipoPropiedades.js"></script>
  <script src="../public/js/propiedades/cargarEstados.js"></script>
  <script src="../public/js/propiedades/cargarPropiedades.js"></script>
  <script src="../public/js/propiedades/filtrarPropiedades.js"></script>

</body>
</html>

