<template>
  <div class="index">
    <h1>{{ msg }}</h1>

    <ul><br>
      <li>
        <b-button  :pressed="false" variant="primary" size="lg" to="/signin" >Sign in</b-button>
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
  data () {
    return {
      msg: 'Welcome to Vue.js App'

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
