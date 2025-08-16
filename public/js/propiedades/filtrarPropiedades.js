document.getElementById('form-filtros').addEventListener('submit', function (e) {
  e.preventDefault();

  const tipo = document.getElementById('tipo-select').value;
  const estado = document.getElementById('estado-select').value;
  const ciudad = document.getElementById('ciudad-select').value;
  const ambientes = document.getElementById('ambientes-number').value;
  const dormitorios = document.getElementById('dormitorios-number').value;
  const garaje = document.getElementById('garaje-checkbox').checked;
  const baños = document.getElementById('baños-number').value;
  const antiguedad = document.getElementById('antiguedad-number').value;
  const superficieMin = document.getElementById('superficie-min').value;
  const superficieMax = document.getElementById('superficie-max').value;
  const minStr = document.getElementById('precio-min').value;
  const maxStr = document.getElementById('precio-max').value;
  // Parseo los valores para evitar errores
  const supMin = superficieMin === '' ? null : parseInt(superficieMin, 10);
  const supMax = superficieMax === '' ? null : parseInt(superficieMax, 10);
  const min = minStr === '' ? null : parseInt(minStr, 10);
  const max = maxStr === '' ? null : parseInt(maxStr, 10);

  if (supMin !== null && supMax !== null && supMin > supMax) {
    alert("La superficie mínima no puede ser mayor que la superficie máxima.");
    return;
  }
  if (min !== null && max !== null && min > max) {
    alert("El precio mínimo no puede ser mayor que el precio máximo.");
    return;
  }
  const params = new URLSearchParams();
  const filtros = [
  ['tipo', tipo],
  ['estado', estado],
  ['ciudad', ciudad],
  ['ambientes', ambientes],
  ['dormitorios', dormitorios],
  ['garaje', garaje ? 1 : ''], // Solo agrega si está chequeado
  ['baños', baños],
  ['antiguedad', antiguedad],
  ['superficie_min', supMin],
  ['superficie_max', supMax],
  ['precio_min', min],
  ['precio_max', max]
];
filtros.forEach(([clave, valor]) => {
  if (valor !== null && valor !== '' && Number(valor) !== 0) {
    params.append(clave, valor);
  }
});
  const url = '/inmobiliaria/backend/controladores/obtenerPropiedad.php?' + params.toString();
  console.log('URL filtro:', url);
  cargarPropiedades(url);
});
