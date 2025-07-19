function cargarPropiedades(url = '/inmobiliaria/backend/controladores/obtenerPropiedad.php') {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }
      return response.text(); // Cambia a text() para ver el contenido real
    })
    .then((text) => {
      try {
        const data = JSON.parse(text);
        renderizarPropiedades(data);
      } catch (e) {
        console.error('Respuesta no es JSON:', text);
        alert('Respuesta inesperada del servidor:\n' + text);
      }
    })
    .catch((error) => {
      console.error('Error al cargar propiedades:', error);
      alert('Error al cargar propiedades: ' + error.message);
    });
}

function renderizarPropiedades(data) {
  const contenedor = document.getElementById('propiedades-listado');
  contenedor.innerHTML = '';

  data.forEach((prop) => {
    const div = document.createElement('div');
    div.className = 'tarjeta-propiedad';

    // Si hay solo una imagen
    let imagenPrincipal = '';
    if (prop.imagenes && prop.imagenes.length === 1) {
      imagenPrincipal = `<img src="/inmobiliaria/public/images/propiedades/${prop.imagenes[0]}" alt="Imagen de propiedad" class="imagen-base" />`;
    }

    // Si hay más de una imagen, preparamos el carrusel fuera del enlace
    let carruselHtml = '';
    if (prop.imagenes && prop.imagenes.length > 1) {
      carruselHtml = `
        <div class="carousel">
          ${prop.imagenes
            .map(
              (img, i) => `
            <img src="/inmobiliaria/public/images/propiedades/${img}" 
                class="imagen-base carousel-img${i === 0 ? ' active' : ''}" 
                alt="Imagen de propiedad ${i + 1}">
          `
            )
            .join('')}
          <button class="carousel-prev">&#10094;</button>
          <button class="carousel-next">&#10095;</button>
        </div>
      `;
    }

    // Ahora el innerHTML del div, el <a> solo con texto + imagenPrincipal (si hay)
    div.innerHTML = `
      <a href="/inmobiliaria/frontend/propiedad.php?id=${prop.id_propiedad}" class="enlace-propiedad">
        ${imagenPrincipal} ${carruselHtml}
        <h3><img src="/inmobiliaria/public/images/icons/ubicacion.png" alt="Ubicacion" class="icono-ubicacion"/> ${prop.ciudad}, ${prop.calle} ${prop.altura}</h3>
        <p class="precio">$${prop.precio}</p>
        <p class="estado">Estado: ${prop.estado}</p>
        <p class="tipo">Tipo: ${prop.tipo}</p>
      </a>
    `;

    contenedor.appendChild(div);
  });

  // Código para activar los botones del carrusel sin que disparen la navegación
  document.querySelectorAll('.carousel').forEach(carousel => {
    const imgs = carousel.querySelectorAll('.carousel-img');
    let index = 0;

    const showImage = (i) => {
      imgs.forEach((img, idx) => {
        img.classList.toggle('active', idx === i);
      });
    };

    carousel.querySelector('.carousel-next').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      index = (index + 1) % imgs.length;
      showImage(index);
    });

    carousel.querySelector('.carousel-prev').addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      index = (index - 1 + imgs.length) % imgs.length;
      showImage(index);
    });

    showImage(index);
  });
}

// Cargar todas al iniciar
document.addEventListener('DOMContentLoaded', function () {
  cargarPropiedades();
});
