<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 :v-if="!loading && orders.length === 0">
        <h1 class="mb-3">Orders</h1>
        <v-list
          subheader
          two-line
        >
          <v-list-tile 
            avatar
            v-for="(order, i) in orders"
            :key="i"
          >
            <v-list-tile-action>
              <v-checkbox 
                @change="markDone(order)"
                :input-value="order.done"
                color="success"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                :to="'/product/' + order.productId"
                class="primary"
              >Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>

        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  },
  methods: {
    markDone(order) {
      this.$store.dispatch('markOrderDone', order.id)
      .then(() => {
        order.done = true;
      })
      .catch(() => {})
    }
  },
  created () {
    this.$store.dispatch('fetchOrder')
  }
}
</script>