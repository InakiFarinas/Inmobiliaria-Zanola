document.addEventListener("DOMContentLoaded", () => {
  fetch("data/propiedades.json")
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById("listado-propiedades");
      data.forEach(p => {
        const div = document.createElement("div");
        div.innerHTML = `<h2>${p.titulo}</h2><p>${p.descripcion}</p><strong>$${p.precio}</strong>`;
        contenedor.appendChild(div);
      });
    });
});

function enviarWhatsApp(e) {
    e.preventDefault();
    const form = e.target;
    const nombre = form.nombre.value.trim();
    const mensaje = form.mensaje.value.trim();
    if(!nombre || !mensaje) return alert("Por favor completa todos los campos.");

    const numeroWhatsApp = "5491135959887"; // Cambia por tu número sin + ni espacios
    const texto = `Hola, soy *${nombre}* y quiero consultar sobre: ${mensaje}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
  }