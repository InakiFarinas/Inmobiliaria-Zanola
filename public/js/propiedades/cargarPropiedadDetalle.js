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
      const container = document.getElementById('detalle-propiedad');
      const imagenes = prop.imagenes || [];

    let galeriaHtml = '';
if (imagenes.length > 0) {
  const imgPrincipal = imagenes[0];

  galeriaHtml = `
    <div class="galeria-preview">
      <div class="imagen-grande">
        <img id="imagen-principal" src="/inmobiliaria/public/images/propiedades/${imgPrincipal}" alt="Imagen principal" />
        <div class="contador-img" id="contador-img">1 / ${imagenes.length}</div>
      </div>
      <div class="miniaturas">
        ${imagenes
          .map(
            (img, i) => `
              <img 
                src="/inmobiliaria/public/images/propiedades/${img}" 
                alt="Miniatura ${i + 1}" 
                class="miniatura ${i === 0 ? 'activa' : ''}" 
                onclick="cambiarImagen(${i})"
              />
            `
          )
          .join('')}
      </div>
    </div>
  `;

        // Modal: ahora contiene TODAS las imágenes
        galeriaHtml += `
          <div id="modal-galeria" class="modal" style="display:none;">
            <div class="modal-contenido">
              <span class="cerrar" onclick="cerrarModal()">&times;</span>
              <div class="galeria-modal">
                ${imagenes
                  .map(
                    (img) => `
                      <img src="/inmobiliaria/public/images/propiedades/${img}" alt="Imagen" />
                    `
                  )
                  .join('')}
              </div>
            </div>
          </div>
        `;
      }

//esto es para el texto arriba del precio 
const estado = prop.estado.toLowerCase();
const textoPrecio = estado === 'alquiler' 
  ? '<span class="label-alquiler">Alquiler por mes</span>' 
  : '<span class="label-venta">Precio de venta</span>';


      // Render del contenido
     container.innerHTML = `
  <div class="galeria-y-detalle">
    ${galeriaHtml}
    <div class="info-propiedad">
     <h1 class="direccion-principal">${prop.calle} ${prop.altura}, ${prop.ciudad}</h1>
<p class="subinfo-propiedad">${prop.tipo} · ${prop.ambientes} Ambientes</p>

      <div class="precio-box">
        <span class="label-precio">${textoPrecio}</span>
        <p class="precio">$${Number(prop.precio).toLocaleString('es-AR')}</p>
       <a 
  href="https://wa.me/5491123456789?text=${encodeURIComponent(`¡Hola! Me interesa la propiedad de ${prop.calle} ${prop.altura}, ${prop.ciudad}`)}" 
  target="_blank" 
  class="btn-wpp-verde"
>
  Contactar por WhatsApp
</a>
      </div>
  <h3>Descripción</h3>
      <p>${prop.descripcion}</p>
    </div>
  </div>

      `;


      
      // Listener para cerrar modal al click afuera
      const modal = document.getElementById('modal-galeria');
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            cerrarModal();
          }
        });
      }
    })
    .catch((err) => {
      console.error('Error al cargar propiedad', err);
      document.body.innerHTML = '<p>Error al cargar la propiedad</p>';
    });
});

// Modal
function abrirModal() {
  document.getElementById('modal-galeria').style.display = 'flex';
}
function cerrarModal() {
  document.getElementById('modal-galeria').style.display = 'none';
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    cerrarModal();
  }
});

//hacer click en las imagenes para cambiarlas
function cambiarImagen(index) {
  const imagenes = document.querySelectorAll('.miniatura');
  const principal = document.getElementById('imagen-principal');
  const contador = document.getElementById('contador-img');

  imagenes.forEach((img, i) => {
    img.classList.toggle('activa', i === index);
    if (i === index) {
      principal.src = img.src;
      contador.textContent = `${i + 1} / ${imagenes.length}`;
    }
  });
}
// Swipe táctil para imagen principal
let startX = 0;
let currentSlideIndex = 0;

function cambiarImagenSwipe(index) {
  currentSlideIndex = index;
  cambiarImagen(currentSlideIndex);
}

const mainImg = document.getElementById('imagen-principal');

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const mainImg = document.getElementById('imagen-principal');

    if (!mainImg) return;

    mainImg.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    mainImg.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      const miniaturas = document.querySelectorAll('.miniatura');
      const total = miniaturas.length;

      if (Math.abs(diff) > 50) {
        // izquierda (→)
        if (diff > 0 && currentSlideIndex < total - 1) {
          currentSlideIndex++;
        }
        // derecha (←)
        else if (diff < 0 && currentSlideIndex > 0) {
          currentSlideIndex--;
        }

        cambiarImagen(currentSlideIndex);
      }
    });
  }, 100); // Esperamos que se renderice la imagen principal
});
