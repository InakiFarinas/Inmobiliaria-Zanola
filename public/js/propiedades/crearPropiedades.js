document.getElementById('form-crear-propiedad').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch('/inmobiliaria/backend/controladores/insertarPropiedad.php', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Propiedad creada correctamente');
      form.reset();
    } else {
      alert(data.errores ? data.errores.join('\n') : 'Error al crear la propiedad');
    }
  })
  .catch(err => {
    console.error('Error en fetch:', err);
    alert('Error al crear la propiedad');
  });
});