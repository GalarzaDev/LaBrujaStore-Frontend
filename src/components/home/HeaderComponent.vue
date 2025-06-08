<template>
  <div class="">
<v-carousel
    cycle
    height="700"
    show-arrows="hover"
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(image, i) in images"
      :key="i"
      :src="image"
      cover
    />
  </v-carousel>
  </div>
  
</template>

<script>
export default {
  name: 'HeaderCarousel',
  data() {
    return {
      images: [
        '/home/header/image1.png',
        '/home/header/image2.png',
        '/home/header/image3.png'
      ]
    }
  }
}
</script>
