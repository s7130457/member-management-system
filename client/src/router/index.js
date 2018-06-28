import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import index from '@/components/index'
import signin from '@/components/signin'
import login from '@/components/login'
import admin from '@/components/admin'
import editMember from '@/components/editMember'
Vue.use(require('vue-moment'))
Vue.use(BootstrapVue)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/admin/:account',
      name: 'admin',
      component: admin
    },
    {
      path: '/member/edit/:member_id',
      name: 'editMember',
      component: editMember
    }
  ]
})
