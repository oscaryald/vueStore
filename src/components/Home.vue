<template>
<div v-if="!loading">
  <v-container fluid>
    <v-layout row>
      <v-flex xs12>
         <v-carousel
            delimiter-icon="stop"
            prev-icon="mdi-arrow-left"
            next-icon="mdi-arrow-right"
          >
            <v-carousel-item
              v-for="(product,i) in promoProducts"
              :key="i"
              :src="product.imageSrc"
            ></v-carousel-item>
          </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex 
        xs12
        sm6
        md4
        v-for="(product, i) in products"
        :key="i"
      >
      
        <v-card>
          <router-link
            :to="'/product/'+product.id"
          >
            <v-card-media
              :src="product.imageSrc"
              heught="350px"
            ></v-card-media>
          </router-link>

          <v-card-title primary-title>
            <div>
              <h3 class="card_heading heading">{{product.title}}</h3>
              <div class="card_describe">
                <div class="subgeading">
                  {{product.description}}
                </div>
                <div class="subgeading">
                  Price: 
                  <span>{{product.price}}</span>
                </div>
              </div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="light-blue darken-4" round outline :to="'/product/'+product.id">Description</v-btn>
            <app-buy-dialog :product="product"></app-buy-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
<div v-else>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-xs-center">
         <v-progress-circular
            :size="100"
            :width="4"
            indeterminate
            color="primary"
         ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
export default {
  computed: {
    promoProducts(){
      return this.$store.getters.promoProducts;
    },
    products() {
      return this.$store.getters.products
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>

