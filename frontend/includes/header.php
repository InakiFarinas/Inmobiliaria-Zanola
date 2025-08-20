<header class="header">
  <div class="col izquierda">
    <img src="../public/images/logo.png" alt="Villafañe Propiedades" class="logo">
  </div>
  <nav class="col centro" id="menu-links">
    <a href="index.php">Inicio</a>
    <a href="propiedades.php">Propiedades</a>
    <a href="nosotros.php">Nosotros</a>
  </nav>
  <div class="col derecha">
    <a href="https://wa.me/5491123456789" target="_blank" class="whatsapp-header-btn" aria-label="WhatsApp">
      <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" />
    </a>
    <!-- Menú hamburguesa -->
    <button class="menu-hamburguesa" id="menu-btn" aria-label="Abrir menú" type="button">
      <span >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <rect y="4" width="24" height="2" rx="1" fill="#222"/>
          <rect y="11" width="24" height="2" rx="1" fill="#222"/>
          <rect y="18" width="24" height="2" rx="1" fill="#222"/>
        </svg>
      </span>
    </button>
  </div>
</header>
<hr class="divisor">
<script>
document.getElementById('menu-btn').addEventListener('click', function() {
  document.getElementById('menu-links').classList.toggle('activo');
});
</script>