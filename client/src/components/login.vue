<template>
  <div class="login" id="login">
    <div>
      <h1>{{ msg }}</h1>
    </div>
    <div class="container">
      <form v-on:submit.prevent="doLogin">
        <div class="form-group">
          <label for="account">Account</label>
          <input type="text" v-model="login.account" id="account" placeholder="Enter account">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password"  v-model="login.password" id="password" placeholder="Enter password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      msg: 'Log in ',
      login: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    doLogin: function () {
      let self = this
      axios.get('http://localhost:3100/admins/' + this.login.account, this.login)
        .then(function (response) {
          self.$router.push({path: '/admin/' + response.data[0].account, params: {account: response.data[0].account}})
        }).catch(function (err) {
          console.error(err)
        })
    }
  }
}
</script>
