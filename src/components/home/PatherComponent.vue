<template>
  <div class="partner-carousel">
    <div class="partner-track">
      <div v-for="(logo, index) in logosDoblados" :key="index" class="partner-logo">
        <img :src="logo" alt="Partner Logo" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartnerCarousel',
  data() {
    return {
      logos: [
        '/home/pather/image1.png',
        '/home/pather/image2.png',
        '/home/pather/image3.png',
        '/home/pather/image4.png',
        '/home/pather/image5.png'
      ]
    }
  },
  computed: {
    logosDoblados() {
      // duplicamos para efecto infinito
      return [...this.logos, ...this.logos]
    }
  }
}
</script>

<style scoped>
.partner-carousel {
  overflow: hidden;
  background-color: #fff;
  padding: 100px;
  margin-left: 40px;
  margin-right: 40px;
  padding-right: 100px;
  padding-left: 100px;
}

.partner-track {
  display: flex;
  width: fit-content;
  animation: scroll-left 20s linear infinite;
}

.partner-logo {
  flex: 0 0 auto;
  width: 120px;
  margin: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-logo img {
  max-height: 40px;
  max-width: 100%;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: filter 0.3s, opacity 0.3s;
}

.partner-logo img:hover {
  filter: none;
  opacity: 1;
}

/* Animación */
@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
