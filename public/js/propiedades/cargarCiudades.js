document.addEventListener('DOMContentLoaded', function() {
  fetch('/inmobiliaria/backend/ciudades.php')
    .then(response => response.json())
    .then(ciudades => {
      const select = document.getElementById('ciudad-select');
      ciudades.forEach(ciudad => {
        const option = document.createElement('option');
        option.value = ciudad.id_ciudad;
        option.textContent = ciudad.nombre;
        select.appendChild(option);
      });
    });
});