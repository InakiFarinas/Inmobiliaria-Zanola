// Pop Up
function cerrarModal() {
  document.getElementById("promo-modal").style.display = "none";
  sessionStorage.setItem("promoMostrada", "true");
}
window.addEventListener("load", () => {
  const promoYaMostrada = sessionStorage.getItem("promoMostrada");
  if (!promoYaMostrada) {
    document.getElementById("promo-modal").style.display = "block";
  }
});
const lupaIcono = document.getElementById('lupa-icono');
const contenedorBusqueda = document.getElementById('contenedor-busqueda');
lupaIcono.addEventListener('click', (e) => {
  e.stopPropagation();
  contenedorBusqueda.classList.toggle('expandir');

  const input = contenedorBusqueda.querySelector('input');
  if (contenedorBusqueda.classList.contains('expandir')) {
    setTimeout(() => input.focus(), 300);
  }
});
document.addEventListener('click', (e) => {
  if (!contenedorBusqueda.contains(e.target)) {
    contenedorBusqueda.classList.remove('expandir');
  }
});
const menuHamburguesa = document.getElementById('menu-hamburguesa');
const menu = document.getElementById('menu');

menuHamburguesa.addEventListener('click', () => {
  menu.classList.toggle('activo');
});


