import Vue, { VNode } from 'vue'
import Dev from './serve.vue'
import compositionApi from '@vue/composition-api'

Vue.use(compositionApi)
Vue.config.productionTip = false

new Vue({
	render: (h): VNode => h(Dev),
}).$mount('#app')
