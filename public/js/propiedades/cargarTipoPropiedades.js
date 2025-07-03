document.addEventListener('DOMContentLoaded', function() {
  fetch('../backend/tipos_propiedades.php')
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