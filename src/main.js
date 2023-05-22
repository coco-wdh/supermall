import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from '@/components/common/toast'

Vue.use(toast)
//解决移动端300ms延迟
FastClick.attach(document.body)
//懒加载
Vue.use(VueLazyload)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
