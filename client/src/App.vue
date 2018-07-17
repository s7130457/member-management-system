<template>
  <div id="app">
<<<<<<< HEAD
    <router-link to="toPage">
      <img v-b-tooltip.hover title="Home" src="./assets/logo.png">
    </router-link>
    <router-view/>
=======
    <page-header/>
        <img src="./assets/logo.png">
      <router-view/>
>>>>>>> 81e6efa241ef093dd3e6dff486e714a5275586eb
  </div>
</template>

<script>
import PageHeader from '@/components/header.vue'
export default {
  name: 'App',
<<<<<<< HEAD
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    toPage () {
      this.isLogin = localStorage.getItem('token') === 'ImLogin'
      if (this.isLogin) {

      }
    }
=======
  components: {
    PageHeader
>>>>>>> 81e6efa241ef093dd3e6dff486e714a5275586eb
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
