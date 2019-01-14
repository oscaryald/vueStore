import * as fb from 'firebase'

class Order {
  constructor (params) {
    this.name = params.name
    this.phone = params.phone
    this.productId = params.productId
    this.done = params.done || false
    this.id = params.id || null
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({commit}, {name, phone, productId, ownerId}) {
      const params = {
        name,
        phone,
        productId
      }
      const order = new Order(params)
      commit('clearError')
      try {
        await fb.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrder ({commit, getters}) {
      commit('clearError')
      commit('setLoading', true)
      const resultOrders = []
      try {
        const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()
        Object.keys(orders).forEach(key => {
          const order = orders[key]
          order.id = key
          resultOrders.push(new Order(order))
        })
        commit('loadOrders', resultOrders)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async markOrderDone ({commit, getters}, payload) {
      commit('clearError')
      try {
        await fb.database().ref(`/users/${getters.user.id}/orders`)
        .child(payload)
        .update({done: true})
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(order => order.done)
    },
    undoneOrders (state) {
      return state.orders.filter(order => !order.done)
    },
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }
}
