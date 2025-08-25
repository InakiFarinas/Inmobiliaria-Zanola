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

  // Parseo valores numéricos
  const supMin = superficieMin === '' ? null : parseInt(superficieMin, 10);
  const supMax = superficieMax === '' ? null : parseInt(superficieMax, 10);
  const min = minStr === '' ? null : parseInt(minStr, 10);
  const max = maxStr === '' ? null : parseInt(maxStr, 10);

  // Validaciones
  if (supMin !== null && supMax !== null && supMin > supMax) {
    alert("La superficie mínima no puede ser mayor que la superficie máxima.");
    return;
  }
  if (min !== null && max !== null && min > max) {
    alert("El precio mínimo no puede ser mayor que el precio máximo.");
    return;
  }

  // Construcción de parámetros
  const params = new URLSearchParams();
  const filtros = [
    ['tipo', tipo],
    ['estado', estado],
    ['ciudad', ciudad],
    ['ambientes', ambientes],
    ['dormitorios', dormitorios],
    ['garaje', garaje ? 1 : ''],
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

  // URL del backend
  const url = '/inmobiliaria/backend/controladores/obtenerPropiedad.php?' + params.toString();
  console.log('URL filtro:', url);

  // Llamamos a la función genérica
  cargarPropiedades(url);
});

document.addEventListener('DOMContentLoaded', function () {
  // Tomar parámetros GET de la URL
  const params = new URLSearchParams(window.location.search);
  const ciudad = params.get('ciudad') || '';
  const estado = params.get('estado') || '';

  // Construir URL al backend con filtros
  let url = '/inmobiliaria/backend/controladores/obtenerPropiedad.php';
  let query = [];
  if (ciudad) query.push('ciudad=' + encodeURIComponent(ciudad));
  if (estado) query.push('estado=' + encodeURIComponent(estado));
  if (query.length > 0) url += '?' + query.join('&');

  // Llamar al backend con los filtros
  cargarPropiedades(url);
});