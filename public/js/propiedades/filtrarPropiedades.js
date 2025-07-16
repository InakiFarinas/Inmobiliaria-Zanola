document.getElementById('form-filtros').addEventListener('submit', function (e) {
  e.preventDefault();

  const tipo = document.getElementById('tipo-select').value;
  const estado = document.getElementById('estado-select').value;
  const ciudad = document.getElementById('ciudad-select').value;

  const params = new URLSearchParams();
  if (tipo) params.append('tipo', tipo);
  if (estado) params.append('estado', estado);
  if (ciudad) params.append('ciudad', ciudad);

  const url = '/inmobiliaria/backend/controladores/obtenerPropiedad.php?' + params.toString();
  cargarPropiedades(url);
});
