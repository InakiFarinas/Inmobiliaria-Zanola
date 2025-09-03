<?php $titulo = "Propiedades"; ?>
<!DOCTYPE html>
<html lang="es">
<?php include("includes/head.php"); ?>
<body>
  <?php include("includes/header.php"); ?>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <main>
    <h1 class="titulopropiedades">Listado de Propiedades</h1>
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
        <label for="ambientes">Ambientes:</label>
        <input type="number" id="ambientes-number" name="ambientes" min="0" max="5" value="0">
        <label for="dormitorios">Dormitorios:</label>
        <input type="number" id="dormitorios-number" name="dormitorios" min="0" max="5" value="0">
        <label for="baños">Baños:</label>
        <input type="number" id="baños-number" name="baños" min="0" max="5" value="0">
        <label for="antiguedad">Antigüedad:</label>
        <input type="number" id="antiguedad-number" name="antiguedad" min="0" max="100" value="0">
        <div>
          <label for="garaje">Garaje:</label>
          <input type="checkbox" id="garaje-checkbox" name="garaje" value="1">
        </div>
        <div class="filtro-item">
          <input type="number" id="precio-min" name="precio_min" placeholder="Precio Mínimo">
          <input type="number" id="precio-max" name="precio_max" placeholder="Precio Máximo">
        </div>
        <div class="filtro-item">
          <input type="number" id="superficie-min" name="superficie_min" placeholder="Superficie Mínima">
          <input type="number" id="superficie-max" name="superficie_max" placeholder="Superficie Máxima">
        </div>
    <div class="botones-filtros">
  <button type="submit">Filtrar</button>
  <button type="button" id="reset-filtros">Borrar filtros</button>
</div>
      </form>
      <div id="propiedades-listado" class="contenedor-propiedad">
        <!-- Al renderizar en la sección de propiedades -->
        <div class="tarjeta-propiedad">
          <!-- contenido de la propiedad -->
        </div>
      </div>
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

