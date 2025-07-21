document.addEventListener('DOMContentLoaded', function() {
  fetch('/inmobiliaria/backend/controladores/obtenerTipoPropiedad.php')
    .then(response => response.json())
    .then(tipos => {
      const select = document.getElementById('tipo-select');
      tipos.forEach(tipo => {
        const option = document.createElement('option');
        option.value = tipo;
        option.textContent = tipo;
        select.appendChild(option);
      });
    });
});