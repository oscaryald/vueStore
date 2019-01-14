import * as fb from 'firebase'

class Product {
  constructor (params) {
    this.title = params.title
    this.vendor = params.vendor
    this.color = params.color
    this.material = params.material
    this.description = params.description
    this.ownerId = params.ownerId
    this.imageSrc = params.imageSrc || ''
    this.promo = params.promo || false
    this.id = params.id || null
  }
}

export default {
  state: {
    products: []
  },
  mutations: {
    createProduct (state, payload) {
      state.products.push(payload)
    },

    loadProducts (state, payload) {
      state.products = payload
    },

    updateProduct (state, {title, description, id}) {
      const product = state.products.find(a => {
        return a.id === id
      })
      product.title = title
      product.description = description
    }
  },
  actions: {
    async createProduct ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const image = payload.image
      try {
        payload.ownerId = getters.user.id
        payload.imageSrc = ''
        const newProduct = new Product(payload)
        const product = await fb.database().ref('products').push(newProduct)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileData = await fb.storage().ref(`products/${product.key}.${imageExt}`).put(image)
        const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        await fb.database().ref('products').child(product.key).update({imageSrc})
        commit('setLoading', false)
        commit('createProduct', {
          ...newProduct,
          id: product.key,
          imageSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },

    async fetchProducts ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const productsVal = await fb.database().ref('products').once('value')
        const products = productsVal.val()
        const resultProducts = Object.keys(products).map(key => {
          return new Product({
            ...products[key],
            id: key
          })
        })
        commit('loadProducts', resultProducts)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },

    async updateProduct ({commit}, {title, description, id}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await fb.database().ref('products').child(id).update({
          title,
          description
        })

        commit('updateProduct', {
          title,
          description,
          id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    products (state) {
      return state.products
    },

    promoProducts (state) {
      return state.products.filter(product => product.promo)
    },

    myProducts (state, getters) {
      return state.products.filter(product => product.ownerId === getters.user.id)
    },

    productById (state) {
      return function (productId) {
        return state.products.find(product => product.id === productId)
      }
    }
  }
}
