<template>
  <v-container>
    <v-layout row v-if="!loading && products.length !== 0">
      <v-flex xs12 offset-sm3>
        <h1>
          Product List
        </h1>
        <v-card
          class="mb-2"
          v-for="(product, i) in products"
          :key="i"
        >
          <v-layout>
            <v-flex xs4>
              <v-card-media
                :src="product.imageSrc"
                height="250px"
              ></v-card-media>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2>{{product.title}}</h2>
                <p>{{product.description}}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :to="'/product/' + product.id"
                  class="info"
                >
                  Open
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else-if="!loading && products.length === 0"> 
      <v-flex xs12 offset-sm3>
        <h1 class="text-primary">You have no products</h1>
      </v-flex>
    </v-layout>
    <v-layout v-else> 
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
</template>
<script>
export default {
  computed: {
    products() {
      return this.$store.getters.products;
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>