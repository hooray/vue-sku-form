import SkuForm from './SkuForm.vue'

SkuForm.install = Vue => {
    if (!Vue) {
        window.Vue = Vue = import('vue')
    }
    Vue.component(SkuForm.name, SkuForm)
}

export default SkuForm
