<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Crear Propiedad</title>
  <link rel="stylesheet" href="../../public/css/admin.css">
</head>
<body>
  <h1>Cargar nueva propiedad</h1>
  <form id="form-crear-propiedad" method="POST" enctype="multipart/form-data">
    <select name="id_ciudad" id="ciudad-select" required>
          <option value="">Todas las ciudades</option>
    </select>
    <input type="text" name="calle" placeholder="Calle" required>
    <input type="text" name="altura" placeholder="Altura" required>
    <input type="number" name="precio" placeholder="Precio" required>
    <select name="estado" id="estado-select" required>
      <option value="">Estado</option>
    </select>
    <select name="tipo" id="tipo-select" required>
          <option value="">Todos los tipos</option>
    </select>

    <input type="number" name="ambientes" placeholder="Ambientes">
    <input type="checkbox" name="garaje" id="garaje"><label for="garaje">Garaje</label>
    <input type="number" name="baños" placeholder="Baños">

    <textarea name="descripcion" placeholder="Descripción..."></textarea>
    <input type="file" name="imagenes[]" accept="image/*" multiple>

    <button type="submit">Crear Propiedad</button>
  </form>
  <script src="../../public/js/propiedades/cargarCiudades.js"></script>
  <script src="../../public/js/propiedades/cargarTipoPropiedades.js"></script>
  <script src="../../public/js/propiedades/cargarEstados.js"></script>
  <script src="../../public/js/propiedades/crearPropiedades.js"></script>
</body>
</html>