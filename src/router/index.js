import Vue from 'vue'
import VueRouter from 'vue-router'

/* const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
} */

Vue.use(VueRouter)

const routes = [
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      component:()=>import('views/home/Home')
    },
    {
      path:'/category',
      component:()=>import('views/category/Category')
    },
    {
      path:'/cart',
      component:()=>import('views/cart/Cart')
    },
    {
      path:'/profile',
      component:()=>import('views/profile/Profile')
    },
    {
      path:'/detail/:id',
      component:()=>import('views/detail/Detail')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
