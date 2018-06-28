<template>
  <div class="login" id="login">
    <div>
      <h1>{{ msg }}</h1>
    </div><br><br>
    <b-container>
      <b-alert variant="danger"
              dismissible
              fade
              :show="showOnlyTime"
              @dismissed="showOnlyTime=0">
        {{alert}}
      </b-alert>
      <b-form >
        <b-form-group id="account"
                horizontal
                :label-cols="6"
                breakpoint="md"
                label="Account"
                label-for="accountInput">

          <b-form-input id="accountInput"
                    type="text"
                    v-model="login.account"
                    required>
          </b-form-input>
        </b-form-group>

        <b-form-group id="password"
                horizontal
                :label-cols="6"
                breakpoint="md"
                label="Password"
                label-for="passwordInput">
          <b-form-input id="passwordInput"
                    type="password"
                    v-model="login.password"
                    required>
          </b-form-input>
        </b-form-group>
        <b-button  class="float-left" type="reset" variant="primary" @click="reset">
          Reset
        </b-button>
        <b-button  class="float-right" type="submit" variant="danger" @click="doSignin">
          Sign in
        </b-button>
      </b-form>
    </b-container>

    <!-- <div class="container">
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
    </div> -->
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
      },
      showAlertTime: 5,
      showOnlyTime: 0,
      alert: ''
    }
  },
  methods: {
    doLogin: function () {
      let self = this
      axios.get('http://localhost:3100/admins/' + this.login.account, this.login)
        .then(function (response) {
          self.$router.push({path: '/admin/' + response.data[0].account, params: {account: response.data[0].account}})
        }).catch(function (error) {
          console.error(error)
          self.showOnlyTime = self.showAlertTime
          self.alert = error
          self.reset()
        })
    },
    reset () {
      this.login = {
        account: '',
        password: ''
      }
    }
  }
}
</script>
<style>
.container {
    max-width: 500px;
}
</style>
