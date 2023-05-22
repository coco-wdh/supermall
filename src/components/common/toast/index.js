import Toast from './Toast.vue'

const obj = {};

obj.install = function(Vue){
  const toastConstrustor = Vue.extend(Toast);
  const toast = new toastConstrustor();
  toast.$mount(document.createElement('div'));
  document.body.appendChild(toast.$el);//toast.$el对应的就是div 
  Vue.prototype.$toast = toast;
}

export default obj
