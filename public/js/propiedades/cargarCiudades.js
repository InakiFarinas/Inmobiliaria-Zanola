document.addEventListener('DOMContentLoaded', function() {
  fetch('../backend/ciudades.php')
    .then(response => response.json())
    .then(ciudades => {
      const select = document.getElementById('ciudad-select');
      ciudades.forEach(nombre => {
        const option = document.createElement('option');
        option.value = nombre;
        option.textContent = nombre;
        select.appendChild(option);
      });
    });
});