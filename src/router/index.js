import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ProductDetail from '../views/ProductDetail.vue'
import SnapProductDetail from '../views/SnapProductDetail.vue'
import OrderConfirm from '../views/OrderConfirm.vue'
import OrderPay from '../views/OrderPay.vue'
import OrderList from '../views/OrderList.vue'
import { getToken } from '@/utils/util'
import { ElMessage, formItemValidateStates } from "element-plus";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      title:'此刻你即是头角 ｜ focus snip'
    }
  },  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      title:'登录 - focussnip'
    },
    beforeEnter:(to,from,next) =>{
      if(getToken() != ''){
        ElMessage.error("请手动退出登录后再前往登录页");
        console.log(from)
        next({path: from.path})
        // next(false)
      }
      else{
        next()
      }
    }
  },{
    path: '/register',
    name: 'register',
    component: Login,
    meta:{
      title:'注册 - focussnip'
    }
  },
  {
    path: '/forgetpassword',
    name: 'forgetpassword',
    component: Login,
    meta:{
      title:'找回密码 - focussnip'
    }
  },
  {
    path: '/productdetail',
    name: 'productdetail',
    component: ProductDetail
  },
  {
    path: '/snapproductdetail',
    name: 'snapproductdetail',
    component: SnapProductDetail
  },
  {
    path:'/orderConfirm',
    name:'orderConfirm',
    component: OrderConfirm
  },
  {
    path:'/orderPay',
    name:'orderPay',
    component: OrderPay
  },
  {
    path:'/orderList',
    name:'orderList',
    component: OrderList
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// const router = new VueRouter()
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
