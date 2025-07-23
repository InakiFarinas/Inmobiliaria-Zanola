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
+        <h3>Encuentra tu propiedad ideal</h3>
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
        <div class="filtro-precio">
          <label for="precio-min">Precio mínimo:</label>
          <input type="range" id="precio-min" name="precio_min" min="0" max="1000000" step="10000" value="0" oninput="actualizarPrecio('min')">
          <span id="precio-min-valor">$0</span>

          <label for="precio-max">Precio máximo:</label>
          <input type="range" id="precio-max" name="precio_max" min="0" max="1000000" step="10000" value="1000000" oninput="actualizarPrecio('max')">
          <span id="precio-max-valor">$1.000.000</span>
        </div>


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

