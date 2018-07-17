// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import VueRouter from 'vue-router'
import router from './router'
import {sync} from 'vuex-router-sync'
import store from '@/store/store'

Vue.config.productionTip = false

<<<<<<< HEAD
// Vue.use(VueRouter)
// const router = new VueRouter({
//   routers,
//   mode: 'history'
// })

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem('token') === 'ImLogin'
  if (isLogin) {
    next()
  } else {
    if (to.path !== '/login') {
      next('/login')
    } else {
      next()
    }
  }
})
=======
sync(store, router)

>>>>>>> 81e6efa241ef093dd3e6dff486e714a5275586eb
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  // template: '<App/>'
  render: h => h(App)

})
