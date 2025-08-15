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
        <form class="barra-busqueda" action="propiedades.php" method="GET">
          <input type="text" name="ubicacion" placeholder="Ubicación..." required>
          <select name="tipo" required>
            <option value="" disabled selected>Seleccionar...</option>
            <option value="comprar">Comprar</option>
            <option value="alquilar">Alquilar</option>
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
        <div class="propiedad-item">
          <img src="../public/images/propiedades/propiedad1.jpg" alt="Propiedad 1">
          <h3>Casa en el Centro</h3>
          <p>3 habitaciones, 2 baños, jardín.</p>
          <span>$200,000</span>
        </div>
        <div class="propiedad-item">
          <img src="../public/images/propiedades/propiedad2.jpg" alt="Propiedad 2">
          <h3>Departamento Moderno</h3>
          <p>2 habitaciones, 1 baño, balcón.</p>
          <span>$150,000</span>
        </div>
        <div class="propiedad-item">
          <img src="../public/images/propiedades/propiedad3.jpg" alt="Propiedad 3">
          <h3>Casa de Campo</h3>
          <p>4 habitaciones, 3 baños, piscina.</p>
          <span>$300,000</span>
        </div>
      </div>
      <div class="ver-mas-propiedades">
        <a href="propiedades.php" class="btn-secundario">Ver Todas las Propiedades</a>
      </div>
    </section>
  </main>

  <?php include('includes/footer.php'); ?>
  <script src="../public/js/propiedades/cargarPropiedades.js"></script>
</body>
</html>
