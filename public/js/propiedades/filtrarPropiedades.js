document.getElementById('form-filtros').addEventListener('submit', function (e) {
  e.preventDefault();

  const tipo = document.getElementById('tipo-select').value;
  const estado = document.getElementById('estado-select').value;
  const ciudad = document.getElementById('ciudad-select').value;

  const minStr = document.getElementById('precio-min').value;
  const maxStr = document.getElementById('precio-max').value;

  const min = minStr === '' ? null : parseInt(minStr, 10);
  const max = maxStr === '' ? null : parseInt(maxStr, 10);

  if (min !== null && max !== null && min > max) {
    alert("El precio mínimo no puede ser mayor que el precio máximo.");
    return;
  }

  const params = new URLSearchParams();
  if (tipo) params.append('tipo', tipo);
  if (estado) params.append('estado', estado);
  if (ciudad) params.append('ciudad', ciudad);
  if (min !== null) params.append('precio_min', min);
  if (max !== null) params.append('precio_max', max);

  const url = '/inmobiliaria/backend/controladores/obtenerPropiedad.php?' + params.toString();
  console.log('URL filtro:', url);
  cargarPropiedades(url);
});


function actualizarPrecio(tipo) {
  const valor = document.getElementById(`precio-${tipo}`).value;
  document.getElementById(`precio-${tipo}-valor`).textContent = `$${parseInt(valor).toLocaleString()}`;
}
