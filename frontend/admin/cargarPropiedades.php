<?php require_once '../../backend/controladores/verificarSesionAdmin.php'; ?>
<!DOCTYPE html>
<html lang="es">
<?php include('../includes/head_admin.php'); ?>
<body class="admin-body">
  <?php include('../includes/header_admin.php'); ?>

  <main class="admin-container">
    <h1 class="admin-title">Cargar nueva propiedad</h1>

    <form id="form-crear-propiedad" method="POST" enctype="multipart/form-data" class="admin-form">

      <div class="form-group">
        <select name="id_ciudad" id="ciudad-select" required class="form-select">
          <option value="">Ubicación</option>
        </select>
      </div>

      <div class="form-row">
        <input type="text" name="calle" placeholder="Calle" required class="form-input">
        <input type="text" name="altura" placeholder="Altura" required class="form-input">
      </div>

      <div class="form-row">
        <input type="number" name="precio" placeholder="Precio" required class="form-input">
        <select name="estado" id="estado-select" required class="form-select">
          <option value="">Estado</option>
        </select>
      </div>
      <div class="form-row">
        <input type="number" name="dormitorios" placeholder="Dormitorios" class="form-input">
        <input type="number" name="ambientes" placeholder="Ambientes" class="form-input">
      </div>
      <div class="form-row">
        <input type="number" name="superficie" placeholder="Superficie" required class="form-input">
        <input type="number" name="antiguedad" placeholder="Antigüedad" required class="form-input">
      </div>
      <div class="form-row">
        <select name="tipo" id="tipo-select" required class="form-select">
          <option value="">Tipo de vivienda</option>
        </select>
      </div>

      <div class="form-group checkbox-group">
        <input type="checkbox" name="garaje" id="garaje" class="form-checkbox">
        <label for="garaje">Garaje</label>
      </div>

      <div class="form-group">
        <input type="number" name="banos" placeholder="Baños" class="form-input">
      </div>

      <div class="form-group">
        <textarea name="descripcion" placeholder="Descripción..." class="form-textarea"></textarea>
      </div>

      <div class="form-group">
        <label for="imagenes">Imágenes</label>
        <input type="file" name="imagenes[]" id="imagenes" accept="image/*" multiple class="form-file">
      </div>

      <button type="submit" class="admin-button">Crear Propiedad</button>
    </form>
  </main>
  <script src="../../public/js/propiedades/cargarCiudades.js"></script>
  <script src="../../public/js/propiedades/cargarTipoPropiedades.js"></script>
  <script src="../../public/js/propiedades/cargarEstados.js"></script>
  <script src="../../public/js/propiedades/crearPropiedades.js"></script>
</body>
</html>
