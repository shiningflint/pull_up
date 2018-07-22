import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDV28q-_Bmo51HfAlSs3Z5_cbbH-roKsCk',
    libraries: 'places'
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
