<template>
  <div class="login" id="login">
    <div>
      <h1>{{ msg }}</h1>
    </div><br><br>
    <b-container id="loginContainer">
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
        </b-form-group><br>
        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <b-button   type="reset" variant="primary" @click="reset">
                Reset
              </b-button>
            </b-col>
            <b-col>
              <b-button   type="submit" variant="danger" @click="doLogin">
                Log in
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-form>
    </b-container>
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
      if (!self.login.account || !self.login.password) { return }
      axios.get('http://localhost:3100/admins/' + this.login.account, this.login)
        .then(function (response) {
          // write login authencation logic here!
          localStorage.setItem('token', 'ImLogin')
          self.$router.push({path: '/admin/' + response.data[0].account, params: {account: response.data[0].account}})
        }).catch(function (error) {
          console.error(error)
          self.showOnlyTime = self.showAlertTime
          self.alert = 'Account or password error!'
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
#loginContainer {
    max-width: 500px;
}
</style>
