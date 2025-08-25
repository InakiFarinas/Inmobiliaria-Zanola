<?php $titulo = "Inicio | Villafañe Propiedades"; ?>
<!DOCTYPE html>
<html lang="es">
<?php include("includes/head.php"); ?>
<body>
  <?php include('includes/header.php'); ?>

  <main>
    <!-- Sección Hero -->
    <section class="hero-index">
      <div class="hero-contenido-index">
        <h1>Encuentra tu Propiedad Ideal</h1>
        <p>Explora propiedades exclusivas y encuentra el espacio perfecto para tu vida.</p>
        
        <!-- Barra de Búsqueda -->
        <form id="form-busqueda" class="barra-busqueda" method="GET">
          <select name="ciudad" id="ciudad-select">
            <option value="">Todas las ciudades</option>
            <!-- Opciones cargadas por JS -->
          </select>
          <select name="estado" id="estado-select">
            <option value="">Seleccionar...</option>
            <!-- Opciones cargadas por JS -->
          </select>
          <button type="submit" class="btn-buscar">Buscar</button>
        </form>
      </div>
    </section>

    <!-- Sección de Características/Servicios -->
    <section class="caracteristicas-index">
      <h2 class="seccion-titulo">¿Por qué elegirnos?</h2>
      <div class="contenedor-caracteristicas">
        <div class="caracteristica-item">
         
          <h3>Búsqueda Personalizada</h3>
          <p>Te ayudamos a encontrar la propiedad que se ajusta a tus deseos y necesidades.</p>
        </div>
        <div class="caracteristica-item">
          <h3>Asesoramiento Experto</h3>
          <p>Nuestro equipo te guía en cada paso del proceso, con transparencia y profesionalismo.</p>
        </div>
        <div class="caracteristica-item">
    
          <h3>Confianza y Seguridad</h3>
          <p>Operaciones seguras y confiables, garantizando tu tranquilidad en todo momento.</p>
        </div>
      </div>
    </section>


    <!-- Sección de Propiedades Destacadas -->

    <section class="novedades-index">
      <h2 class="seccion-titulo">Nuestras Últimas Propiedades</h2>
      <div id="propiedades-listado" class="contenedor-propiedades">
        
      </div>
      <div class="ver-mas-propiedades">
        <a href="propiedades.php" class="btn-secundario">Ver Todas las Propiedades</a>
      </div>
    </section>
  </main>

  <?php include('includes/footer.php'); ?>
  <script src="../public/js/propiedades/cargarPropiedades.js"></script>
  <script src="../public/js/propiedades/cargarEstados.js"></script>
  <script src="../public/js/propiedades/cargarCiudades.js"></script>
</body>
<script>
  document.getElementById('form-busqueda').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const ciudad = document.getElementById('ciudad-select').value;
    const estado = document.getElementById('estado-select').value;
    
    // redirigimos a propiedades.php con los filtros
    window.location.href = `propiedades.php?ciudad=${encodeURIComponent(ciudad)}&estado=${encodeURIComponent(estado)}`;
  });
</script>
</html>
