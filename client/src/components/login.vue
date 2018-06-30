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
      axios.post('http://localhost:3100/login', this.login)
        .then(function (response) {
          console.log(response)
          self.$store.dispatch('setToken', response.data.token)
          self.$store.dispatch('setUser', response.data.admin)
          console.log('store')
          console.log(self.store)
          self.$router.push({path: '/admin/' + response.data.admin.account, params: {account: response.data.admin.account}})
        }).catch(function (err) {
          // console.error(err.response)
          self.showOnlyTime = self.showAlertTime
          self.alert = err.response.data.error
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
