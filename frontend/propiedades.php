<?php $titulo = "Propiedades"; ?>
<!DOCTYPE html>
<html lang="es">
<?php include("includes/head.php"); ?>
  
<body>
  <?php include("includes/header.php"); ?>
    <!-- Mapa -->

  <main>
    <section class="filtros-container">
    <form id="form-filtros" method="get" class="filtros">
      <h2>Encontrá tu propiedad ideal</h2>

      <div class="filtros-row">
        <select name="tipo" id="tipo-select">
          <option value="">Tipo</option>
        </select>

        <select name="estado" id="estado-select">
          <option value="">Estado</option>
        </select>

        <select name="ciudad" id="ciudad-select">
          <option value="">Ciudad</option>
        </select>
      </div>

      <div class="filtros-row precios">
        <label for="precio-min">Mín:</label>
        <input type="range" id="precio-min" name="precio_min" min="0" max="1000000" step="10000" value="0" oninput="actualizarPrecio('min')">
        <span id="precio-min-valor">$0</span>

        <label for="precio-max">Máx:</label>
        <input type="range" id="precio-max" name="precio_max" min="0" max="1000000" step="10000" value="1000000" oninput="actualizarPrecio('max')">
        <span id="precio-max-valor">$1.000.000</span>
      </div>

      <button type="submit" class="btn-filtrar">Filtrar</button>
    </form>
  </section>

  <section id="propiedades-listado" class="contenedor-propiedades"></section>
</main>
   

<div class="mapa-propiedades" style="width:100%;max-width:900px;margin:0 auto 2rem auto;">
    <h3>Nuestras ubicaciones</h3>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.527601222799!2d-58.64656268477036!3d-34.64163418045209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcc7c7e1e9c2e7%3A0x7e7c1b6e6e0e6e0e!2sCastelar%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1689876543210!5m2!1ses-419!2sar"
            width="100%" height="320" style="border:0; border-radius:20px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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

