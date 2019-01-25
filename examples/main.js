import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import BaseFlow from 'vue-g6-editor'
import App from './App.vue'

import 'vue-g6-editor/lib/BaseFlow.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(BaseFlow)

new Vue({
  render: h => h(App)
}).$mount('#app')
