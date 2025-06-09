 <template>
  <v-container fluid class="py-8">
    

    <v-row dense>
      <v-col
        v-for="(product, i) in products"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="h-100" elevation="4">
          <v-img
            :src="product.image"
            height="180"
            cover
            class="rounded-t"
          ></v-img>

          <v-card-title class="text-wrap text-red">
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle class="text-grey-darken-1 text-sm">
            {{ product.description }}
          </v-card-subtitle>

          <v-card-text>
            <div class="text-red font-weight-bold text-lg">S/ {{ product.price }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="red-darken-2" variant="flat" block>
              Comprar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProductList',
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
  }
}
</script>
