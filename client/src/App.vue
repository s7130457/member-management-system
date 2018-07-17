<template>
  <div id="app">
    <router-link to="toPage">
      <img v-b-tooltip.hover title="Home" src="./assets/logo.png">
    </router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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
