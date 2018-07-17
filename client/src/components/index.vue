<template>
  <div class="index">
    <h1>{{ msg }}</h1>

    <ul><br>
      <li>
        <b-button  :pressed="false" variant="primary" size="lg" to="/register" >Register</b-button>
      </li>
      <li>
        <b-button  :pressed="false" variant="danger" size="lg" to="/login">Log in</b-button>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'index',
  ready () {

  },
  mounted () {
    this.a()
  },
  data () {
    return {
      msg: 'Welcome to Vue.js App',
      isLogin: localStorage.getItem('token') === 'ImLogin'

    }
  },
  methods: {
    a () {
      console.log(this.isLogin)
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
