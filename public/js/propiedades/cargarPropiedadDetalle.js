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
        <button class="flecha-carrusel izquierda" onclick="moverCarrusel(-1)">&lt;</button>
        <img id="imagen-principal" src="/inmobiliaria/public/images/propiedades/${imgPrincipal}" alt="Imagen principal" />
        <button class="flecha-carrusel derecha" onclick="moverCarrusel(1)">&gt;</button>
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


      // Render del contenido
      container.innerHTML = `
       <div class="galeria-y-detalle">
    <div class="galeria-preview">
      ${galeriaHtml}
    </div>
    <div class="detalle-derecha">
      <div id="direccion" class="titulo-direccion">
        ${prop.ciudad}, ${prop.calle} ${prop.altura}
      </div>   

      <p class="precio">${prop.estado} $${prop.precio}</p>

      <section class="descripcion">
        <div class="titulo-descripcion">Descripción</div>
        <p>${prop.descripcion}</p>
      </section>

      <div class="acciones-contacto">
        <a
          href="https://wa.me/5491123456789?text=${encodeURIComponent('¡Hola villafañe propiedades, me interesa la propiedad ' + prop.ciudad + ', ' + prop.calle + ' ' + prop.altura + ', necesitaría más info! Gracias!')}"
          target="_blank"
          class="btn-whatsapp"
        >
          Consultar por WhatsApp
        </a>

        <button class="btn-guardar-inline" onclick="guardarPropiedad(${prop.id_propiedad})">
          <img src="/inmobiliaria/public/images/icons/compartir.png" alt="Compartir propiedad" class="icono-guardar-inline" />
        </button>
      </div>
    </div>
  </div>
  </div>
              <section class="tarjetas">
        <div class="caracteristicas-propiedad">
          <div class="item">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-building"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M9 8l1 0" /><path d="M9 12l1 0" /><path d="M9 16l1 0" /><path d="M14 8l1 0" /><path d="M14 12l1 0" /><path d="M14 16l1 0" /><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" /></svg>
            <span>${prop.tipo}</span>
          </div>
          <div class="item">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M15 20a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M5 20h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" /><path d="M3 6l9 -4l9 4" /></svg>
            <span>${prop.garaje == 1 ? 'Sí' : 'No'}</span>
          </div>
          <div class="item">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-3a1 1 0 0 1 1 -1z" /><path d="M6 12v-7a2 2 0 0 1 2 -2h3v2.25" /><path d="M4 21l1 -1.5" /><path d="M20 21l-1 -1.5" /></svg>
            <span>${prop.baños} baño${prop.baños > 1 ? 's' : ''}</span>
          </div>
          <div class="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20H2"/><path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z"/><path d="M11 4H8a2 2 0 0 0-2 2v14"/><path d="M14 12h.01"/><path d="M22 20h-3"/></svg>
            <span>${prop.ambientes} ambiente${prop.ambientes > 1 ? 's' : ''}</span>
          </div>
          <div class="item">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bed-double-icon lucide-bed-double"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/></svg>
            <span>${prop.dormitorios} dormitorio${prop.dormitorios > 1 ? 's' : ''}</span>
          </div>
          <div class="item">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-squares"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 10a2 2 0 0 1 2 -2h9a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-9a2 2 0 0 1 -2 -2z" /><path d="M16 8v-3a2 2 0 0 0 -2 -2h-9a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h3" /></svg>
            <span>${prop.superficie} m²</span>
          </div>
          <div class="item">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-stats"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.795 21h-6.795a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4" /><path d="M18 14v4h4" /><path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M15 3v4" /><path d="M7 3v4" /><path d="M3 11h16" /></svg>
            <span>${prop.antiguedad} años</span>
          </div>
        </div>
         </section>    
       
      `;
      setTimeout(cargarMapa, 0);
      cargarMapa();
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
//carrusel 
let indiceActual = 0;
window.moverCarrusel = function(direccion) {
  const imagenes = document.querySelectorAll('.miniatura');
  indiceActual += direccion;
  if (indiceActual < 0) indiceActual = imagenes.length - 1;
  if (indiceActual >= imagenes.length) indiceActual = 0;
  cambiarImagen(indiceActual);
}
window.cambiarImagen = function(indice) {
  const imagenes = document.querySelectorAll('.miniatura');
  const principal = document.getElementById('imagen-principal');
  if (!imagenes[indice]) return;
  imagenes.forEach(img => img.classList.remove('activa'));
  imagenes[indice].classList.add('activa');
  principal.src = imagenes[indice].src;
  indiceActual = indice;
  const contador = document.getElementById('contador-img');
  if (contador) contador.textContent = `${indice + 1} / ${imagenes.length}`;
}

// Funciones para mapa
async function obtenerCoordenadas(direccion) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;

  try {
    const respuesta = await fetch(url, {
      headers: {
        'User-Agent': 'TuAppWeb/1.0 (tuemail@ejemplo.com)'
      }
    });
    const resultados = await respuesta.json();
    if (resultados.length > 0) {
      const { lat, lon } = resultados[0];
      return { lat, lon };
    } else {
      console.warn('No se encontraron coordenadas para:', direccion);
      return null;
    }
  } catch (error) {
    console.error('Error al obtener coordenadas:', error);
    return null;
  }
}

function cargarMapa() {
  const direccion = document.getElementById('direccion')?.textContent;
  if (!direccion) {
    console.error("No se encontró la dirección");
    return;
  }

  // Usar Geocodificación de Nominatim (OpenStreetMap)
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`)
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) {
        console.error("No se encontraron coordenadas para la dirección");
        return;
      }

      const { lat, lon } = data[0];
      const map = L.map('map').setView([lat, lon], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      L.marker([lat, lon]).addTo(map)
        .bindPopup(direccion)
        .openPopup();
    })
    .catch(err => {
      console.error("Error al geocodificar dirección:", err);
    });
}
