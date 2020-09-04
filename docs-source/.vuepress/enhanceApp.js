import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default ({
	Vue // VuePress 正在使用的 Vue 构造函数
}) => {
	Vue.use(ElementUI)
	import('vue-sku-form').then(function (m) {
		Vue.use(m.default)
	})
}