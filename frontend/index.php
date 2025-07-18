<?php $titulo = "Inicio"; ?>
<!DOCTYPE html>
<html lang="es">
<?php include("includes/head.php"); ?>
<body>
  <?php include('includes/header.php'); ?>
  <main>
    <section class="hero">
      <div class = "hero-contenido">
        <h1>Bienvenidos a Nuestra Inmobiliaria</h1>
        <p>Encontrá tu propiedad ideal con confianza, seguridad y atención personalizada.</p>
        <a href="propiedades.php" class="btn-hero">Ver Propiedades</a>
      </div>
    </section>
    <section class="novedades">
      <h2>Novedades</h2>
      <div id= "propiedades-listado" class="contenedor-propiedades">

      </div>
    </section>
  </main>
  <?php include('includes/footer.php'); ?>
  <script src="../public/js/propiedades/cargarPropiedades.js"></script>
</body>
</html>