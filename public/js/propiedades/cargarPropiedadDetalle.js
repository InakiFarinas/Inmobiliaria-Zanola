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
        const secundarias = imagenes.slice(1, 5); // 2 a 5

        galeriaHtml = `
          <div class="galeria-propiedad">
            <div class="imagen-principal">
              <img src="/inmobiliaria/public/images/propiedades/${imgPrincipal}" alt="Imagen principal" />
            </div>
            <div class="imagenes-secundarias">
              ${secundarias
                .map(
                  (img, i) => `
                    <img src="/inmobiliaria/public/images/propiedades/${img}" alt="Imagen secundaria ${i + 2}" />
                  `
                )
                .join('')}
            </div>
            ${
              imagenes.length > 5
                ? `
                <div class="ver-mas" onclick="abrirModal()">
                  <div class="overlay">Ver todas las fotos</div>
                </div>
              `
                : ''
            }
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
        <h1>${prop.ciudad}, ${prop.calle} ${prop.altura}</h1>
        ${galeriaHtml}
        <h2 class="tipo-ambientes">${prop.tipo} · ${prop.ambientes} Ambientes</h2>
        <p class="precio">${prop.estado} $${prop.precio}</p>
        <div class="caracteristicas-propiedad">
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
        <section class= "descripcion">
          <h2>Descripción</h2>
          <p>${prop.descripcion}</p>
        </section>
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
