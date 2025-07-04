document.addEventListener('DOMContentLoaded', function() {
  fetch('/inmobiliaria/backend/propiedades/estados.php')
    .then(response => response.json())
    .then(tipos => {
      const select = document.getElementById('estado-select');
      tipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = tipo;
        select.appendChild(option);
      });
    });
});