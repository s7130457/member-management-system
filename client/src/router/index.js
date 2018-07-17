import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import index from '@/components/index'
import register from '@/components/register'
import login from '@/components/login'
import admin from '@/components/admin'
import editMember from '@/components/editMember'
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
      path: '/register',
      name: 'register',
      component: register
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
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
