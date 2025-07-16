document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    document.body.innerHTML = '<p>ID inválido</p>';
    return;
  }

  fetch(`/inmobiliaria/backend/controladores/obtenerPropiedadDetalle.php?id=${id}`)
    .then((res) => res.json())
    .then((prop) => {
      let imagenesHtml = '';
      if (prop.imagenes && prop.imagenes.length > 0) {
        imagenesHtml = `
            <div class="galeria-imagenes">
            ${prop.imagenes
              .map(
                (img) => `
                <img src="/inmobiliaria/public/images/propiedades/${img}" alt="Imagen de la propiedad" class="imagen-detalle">
            `
              )
              .join('')}
            </div>
        `;
      }
      const container = document.getElementById('detalle-propiedad');
      container.innerHTML = `
        <h1>${prop.tipo} en ${prop.calle} ${prop.altura}</h1>
        ${imagenesHtml}
        <p><strong>Ciudad:</strong> ${prop.ciudad}</p>
        <p><strong>Precio:</strong> $${prop.precio}</p>
        <p><strong>Estado:</strong> ${prop.estado}</p>
        <p><strong>Ambientes:</strong> ${prop.ambientes}</p>
        <p><strong>Garaje:</strong> ${prop.garaje == 1 ? 'Sí' : 'No'}</p>
        <p><strong>Baños:</strong> ${prop.baños}</p>
        <p><strong>Descripción:</strong> ${prop.descripcion}</p>
        <p><strong>Fecha de publicación:</strong> ${new Date(prop.fecha_publicacion).toLocaleDateString()}</p>
      `;
    })
    .catch((err) => {
      console.error('Error al cargar propiedad', err);
      document.body.innerHTML = '<p>Error al cargar la propiedad</p>';
    });
});
