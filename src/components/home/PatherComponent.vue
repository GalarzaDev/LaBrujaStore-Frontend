<template>
  <div class="partner-carousel">
    <div class="partner-track">
      <div class="partner-slide" v-for="(logo, index) in logosDoblados" :key="index">
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
      // Se duplican para un efecto infinito sin cortes
      return [...this.logos, ...this.logos]
    }
  }
}
</script>

<style scoped>
.partner-carousel {
  overflow: hidden;
  white-space: nowrap;
  background-color: #fff;
  padding: 50px 100px;
}

.partner-track {
  display: flex;
  width: max-content;
  animation: scroll-left 30s linear infinite;
}

.partner-slide {
  flex: 0 0 auto;
  width: 120px;
  margin: 0 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.partner-slide img {
  max-height: 40px;
  max-width: 100%;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: filter 0.3s, opacity 0.3s;
}

.partner-slide img:hover {
  filter: none;
  opacity: 1;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
