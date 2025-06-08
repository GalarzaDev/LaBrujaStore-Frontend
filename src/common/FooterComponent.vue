<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Logo y redes -->
      <div class="footer-column">
        <img src="/logo.png" alt="La Bruja Logo" class="logo" />
        <p>Consigue las mejores marcas a los mejores precios, aquí en La Bruja Store.</p>
        <p>Síguenos en nuestras redes sociales:</p>
        <div class="social-icons">
          <img src="/icons/facebook.svg" alt="Facebook" />
          <img src="/icons/instagram.svg" alt="Instagram" />
          <img src="/icons/tiktok.svg" alt="TikTok" />
        </div>
      </div>

      <!-- Contacto -->
      <div class="footer-column">
        <h3>CONTÁCTANOS</h3>
        <hr />
        <p>📱 CONTACTANOS</p>
        <p>📍 AREQUIPA: C.C. CompuArequipa Tienda 133 y 219</p>
        <p>📍 LIMA: C.C. Cyberplaza tienda 140 sector 2 B</p>
        <p>📧 labrujastore@outlook.com</p>
      </div>

      <!-- Políticas -->
      <div class="footer-column">
        <h3>POLÍTICAS</h3>
        <hr />
        <p>Nosotros</p>
        <p>Políticas de Privacidad</p>
        <p>Términos y Condiciones</p>
        <p>Devoluciones</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #000;
  color: #fff;
  padding: 40px 20px;
  font-family: sans-serif;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
}

.footer-column {
  flex: 1 1 300px;
  min-width: 250px;
}

.footer-column h3 {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.footer-column hr {
  width: 60px;
  border: 2px solid white;
  margin-bottom: 10px;
}

.logo {
  height: 50px;
  margin-bottom: 10px;
}

.social-icons {
  display: flex;
  gap: 16px;
  margin-top: 10px;
}

.social-icons img {
  width: 36px;
  height: 36px;
  background-color: white;
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  transition: transform 0.2s;
}

.social-icons img:hover {
  transform: scale(1.1);
}
</style>
