<template>
  <section class="carousel-wrapper">
    <h2 class="carousel-title"> Productos Nuevos</h2>

    <!-- Flechas -->
    <button class="arrow left" @click="scrollLeft">&#8592;</button>
    <button class="arrow right" @click="scrollRight">&#8594;</button>

    <!-- Carrusel -->
    <div ref="carousel" class="carousel-container">
      <div
        v-for="(product, i) in products"
        :key="i"
        class="product-card"
      >
        <img :src="product.image" alt="Producto" />
        <h3>{{ product.name }}</h3>
        <p class="description">{{ product.description }}</p>
        <p class="price">S/ {{ product.price }}</p>
        <button class="buy-button">Comprar</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ProductComponent',
  data() {
    return {
      products: [
        {
          name: 'HP Pavilion 14"',
          price: 1999,
          image: '/home/product/image1.png',
          description: 'Ligera, rápida y perfecta para estudiantes.'
        },
        {
          name: 'Lenovo Ideapad 3',
          price: 1899,
          image: '/home/product/image2.png',
          description: 'Potencia y diseño accesible para el hogar.'
        },
        {
          name: 'Asus ZenBook S',
          price: 2499,
          image: '/home/product/image3.png',
          description: 'Ultra delgada con gran autonomía.'
        },
        {
          name: 'MacBook Air M1',
          price: 3999,
          image: '/home/product/image4.png',
          description: 'Rendimiento silencioso con chip M1.'
        },
        {
          name: 'Dell XPS 13',
          price: 2999,
          image: '/home/product/image5.png',
          description: 'Pantalla infinita y gran rendimiento.'
        },
        {
          name: 'Huawei MateBook D15',
          price: 1799,
          image: '/home/product/image6.png',
          description: 'Equilibrio entre elegancia y potencia.'
        }
      ]
    }
  },
  methods: {
    scrollLeft() {
      this.$refs.carousel.scrollLeft -= 300
    },
    scrollRight() {
      this.$refs.carousel.scrollLeft += 300
    }
  }
}
</script>

<style scoped>
.carousel-wrapper {
  padding: 2rem 1rem;
  background: #fafafa;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.carousel-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
}

.carousel-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 12px;
  padding: 0 30px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  justify-content: center;
}
.carousel-container::-webkit-scrollbar {
  display: none;
}

.product-card {
  flex: 0 0 220px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.product-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 8px;
}

.product-card h3 {
  font-size: 1rem;
  margin: 5px 0;
  color: #222;
}

.description {
  font-size: 0.8rem;
  color: #555;
  margin-bottom: 5px;
}

.price {
  font-size: 0.9rem;
  color: red;
  font-weight: bold;
  margin-bottom: 8px;
}

.buy-button {
  background-color: red;
  color: white;
  border: none;
  padding: 6px 10px;
  font-size: 0.85rem;
  border-radius: 4px;
  cursor: pointer;
}

.buy-button:hover {
  background-color: darkred;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  background: white;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 6px 10px;
  cursor: pointer;
  z-index: 1;
}

.arrow.left {
  left: 0;
}

.arrow.right {
  right: 0;
}
</style>
