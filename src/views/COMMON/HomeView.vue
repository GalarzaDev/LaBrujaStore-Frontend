<template>
  <div>
  
   
      <HeaderCarousel />
      <ProductComponent />
      <OffertLaptopComponent />
      <OffertComboComponent/>
      <PatherComponent/>
      <FooterComponent/>
  </div>
</template>

<script>
import HeaderCarousel from '@/components/home/HeaderComponent.vue'
import ProductComponent from '@/components/home/ProductComponent.vue'
import OffertLaptopComponent from '@/components/home/OffertLaptopComponent.vue'
import OffertComboComponent from '@/components/home/OffertComboComponent.vue'
import  PatherComponent from '@/components/home/PatherComponent.vue'
import  FooterComponent from '@/common/FooterComponent.vue'
export default {
  components: {
    HeaderCarousel,
    ProductComponent,
    OffertLaptopComponent,
    OffertComboComponent,
    PatherComponent,
    FooterComponent
  }
}
</script>
