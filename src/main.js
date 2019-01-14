import Vue from 'vue'
import App from './App'
import BuyDialogComponent from '@/components/Common/BuyDialog'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import * as fb from 'firebase/app'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.component('app-buy-dialog', BuyDialogComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
  // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyDEPcn3ErVFTBYBLR09NW5oAZ-DUZLxUxE',
      authDomain: 'nlinestore-2e778.firebaseapp.com',
      databaseURL: 'https://onlinestore-2e778.firebaseio.com',
      projectId: 'onlinestore-2e778',
      storageBucket: 'onlinestore-2e778.appspot.com',
      messagingSenderId: '472781461738'
    }
    fb.initializeApp(config)

    fb.auth().onAuthStateChanged(user => {
      if (!user) return
      this.$store.dispatch('autoLoginUser', user)
    })

    this.$store.dispatch('fetchProducts')
  }
})
