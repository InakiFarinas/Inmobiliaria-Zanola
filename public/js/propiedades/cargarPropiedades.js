function cargarPropiedades(url = '/inmobiliaria/backend/controladores/obtenerPropiedad.php', targetId = 'propiedades-listado') {
  fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      return response.text();
    })
    .then((text) => {
      const cleanText = text.trim();
      if (cleanText === '') {
        console.warn('Respuesta vacía del servidor.');
        renderizarPropiedades([], targetId);
        return;
      }
      try {
        const data = JSON.parse(cleanText);
        renderizarPropiedades(data, targetId);
      } catch (e) {
        console.error('Respuesta no es JSON válido:\n', cleanText);
        const contenedor = document.getElementById(targetId);
        if (contenedor) contenedor.innerHTML = `<p style="color:red;">Error en la respuesta del servidor. Ver consola.</p>`;
      }
    })
    .catch((error) => {
      console.error('Error al cargar propiedades:', error);
      const contenedor = document.getElementById(targetId);
      if (contenedor) contenedor.innerHTML = `<p style="color:red;">Error al cargar propiedades: ${error.message}</p>`;
    });
}

function cargarUltimasPropiedades(targetId = 'propiedades-ultimas', limite = 5) {
  const url = `/inmobiliaria/backend/controladores/obtenerPropiedad.php?ultimas=${limite}`;
  cargarPropiedades(url, targetId);
}

function renderizarPropiedades(data, targetId = 'propiedades-listado') {
  const contenedor = document.getElementById(targetId);
  if (!contenedor) return;

  contenedor.innerHTML = '';

  data.forEach((prop) => {
    const div = document.createElement('div');
    div.className = 'tarjeta-propiedad';

    let imagenPrincipal = '';
    if (prop.imagenes && prop.imagenes.length === 1) {
      imagenPrincipal = `<img src="/inmobiliaria/public/images/propiedades/${prop.imagenes[0]}" alt="Imagen de propiedad" class="imagen-base" />`;
    }

    let carruselHtml = '';
    if (prop.imagenes && prop.imagenes.length > 1) {
      carruselHtml = `
        <div class="carousel">
          ${prop.imagenes
            .map(
              (img, i) => `
            <img src="/inmobiliaria/public/images/propiedades/${img}" class="imagen-base carousel-img${i === 0 ? ' active' : ''}" alt="Imagen de propiedad ${i + 1}">
          `
            )
            .join('')}
          <button class="carousel-prev">&#10094;</button>
          <button class="carousel-next">&#10095;</button>
        </div>
      `;
    }

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

  // Activar carrusel
  document.querySelectorAll('.carousel').forEach((carousel) => {
    const imgs = carousel.querySelectorAll('.carousel-img');
    let index = 0;
    const showImage = (i) => imgs.forEach((img, idx) => img.classList.toggle('active', idx === i));

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

document.addEventListener('DOMContentLoaded', function () {
  cargarUltimasPropiedades('propiedades-ultimas', 5);

  const params = new URLSearchParams(window.location.search); // <-- esto faltaba
  const filtroParams = new URLSearchParams();
  for (const [key, value] of params) {
    if (key !== 'ultimas') {
      filtroParams.append(key, value);
    }
  }

  if ([...filtroParams].length > 0) {
    const url = '/inmobiliaria/backend/controladores/obtenerPropiedad.php?' + filtroParams.toString();
    cargarPropiedades(url); // carga con filtros
  }

  const form = document.getElementById('form-filtros');
  if (form) {
    filtroParams.forEach((value, key) => {
      const input = form.elements[key];
      if (input) input.value = value;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newParams = new URLSearchParams(new FormData(form));
      window.history.pushState({}, '', window.location.pathname + '?' + newParams.toString());
      cargarPropiedades('/inmobiliaria/backend/controladores/obtenerPropiedad.php?' + newParams.toString());
    });
  }
});
