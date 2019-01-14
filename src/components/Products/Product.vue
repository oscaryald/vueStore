<template>
  <v-container>
    <section v-if="!loading">
      <v-layout xs12>
        <img :src="product.imageSrc">
      </v-layout>
      <v-layout xs12>
        <div>
          <h4>
            {{product.title}}
          </h4>
          <p>
            <span>Vendor: </span> {{product.vendor}}
          </p>
          <p>
            <span>Price: </span>$ {{product.price}}
          </p>
          <p>
            <span>Color: </span>
            <span
              :title="product.color"
              :style="{backgroundColor: product.color}"
              class="product_color_bg"
            >{{product.color}}</span>
          </p>
          <p>
            <span>Material: </span>{{product.material}}
          </p>
          <div>
            <p>
              Decription:
            </p>
            {{product.description}}
          </div>
          <app-edit-product 
            :product="product"
            v-if="isOwner"
          ></app-edit-product>
          <app-buy-dialog :product="product"></app-buy-dialog>
        </div>
      </v-layout>
    </section>
    <section v-else>
      <v-flex xs12 class="text-xs-center">
         <v-progress-circular
            :size="100"
            :width="4"
            indeterminate
            color="primary"
         ></v-progress-circular>
      </v-flex>
    </section>
  </v-container>
</template>
<script>
import EditProduct from './EditProduct'
export default {
  props: ['id'],
  computed: {
    product() {
      const id = this.id;
      return this.$store.getters.productById(id)
    },

    loading() {
      return this.$store.getters.loading
    },

    isOwner() {
      return this.$store.getters.user.id === this.product.ownerId
    }
  },
  components: {
    appEditProduct: EditProduct
  }
}
</script>