<?php include("includes/db.php"); ?>
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
        <select name="tipo">
          <option value="">Todos los tipos</option>
          <option value="Casa">Casa</option>
          <option value="Departamento">Departamento</option>
        </select>

        <select name="ciudad">
          <option value="">Todas las ciudades</option>
          <option value="La Plata">La Plata</option>
          <option value="Buenos Aires">Buenos Aires</option>
        </select>

        <button type="submit">Filtrar</button>
      </form>

      <div id="listado-propiedades">
        <?php
          $tipo = isset($_GET['tipo']) ? $_GET['tipo'] : "";
          $ciudad = isset($_GET['ciudad']) ? $_GET['ciudad'] : "";

          $query = "SELECT * FROM propiedades WHERE 1";

          if ($tipo !== "") {
              $query .= " AND tipo = '" . $conexion->real_escape_string($tipo) . "'";
          }

          if ($ciudad !== "") {
              $query .= " AND ciudad = '" . $conexion->real_escape_string($ciudad) . "'";
          }

          $resultado = $conexion->query($query);

          if ($resultado->num_rows > 0) {
              while ($prop = $resultado->fetch_assoc()) {
                  echo "<div class='card'>";
                  echo "<img src='img/{$prop['imagen']}' alt='{$prop['titulo']}' width='300'>";
                  echo "<h2>{$prop['titulo']}</h2>";
                  echo "<p>{$prop['descripcion']}</p>";
                  echo "<p><strong>\${$prop['precio']}</strong> - {$prop['ciudad']}</p>";
                  echo "</div>";
              }
          } else {
              echo "<p>No se encontraron propiedades con esos filtros.</p>";
          }

          $conexion->close();
        ?>
      </div>
    </div>
  </main>
  <?php include("includes/footer.php"); ?>
</body>
</html>

