import Vue from 'vue'
import App from './App.vue'
import store from './store'
import * as VueGoogleMaps from "vue2-google-maps";
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDmCUgwiL4-T55oFfXTU5EJnRr1hizazg4",
    libraries: "places" // necessary for places input
  },
  installComponents: true
});



new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
