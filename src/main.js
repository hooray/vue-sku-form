import Vue from 'vue'
import App from './App.vue'

import SkuForm from './components/index'
Vue.use(SkuForm)

Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')
