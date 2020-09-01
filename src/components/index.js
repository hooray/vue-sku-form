import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import SkuForm from './SkuForm.vue'

export default {
    install: function(Vue) {
        Vue.component('SkuForm', SkuForm)
    }
}