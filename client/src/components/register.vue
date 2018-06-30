<template>
  <div class="register" id="register">
    <div>
      <h1>{{ msg }}</h1>
    </div><br><br>
    <b-container id="registerContainer">
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
                      label="Admin account"
                      label-for="accountInput">
          <b-form-input id="accountInput"
                        type="text"
                        v-model="register.account"
                        :state="validateAccount"
                        v-on:change="verify"
                        required>
          </b-form-input>
        </b-form-group>

        <b-form-group id="password"
                      horizontal
                      :label-cols="6"
                      breakpoint="md"
                      label="Admin password"
                      label-for="passwordInput">
          <b-form-input id="passwordInput"
                        type="password"
                        v-model="register.password"
                        :state="validatePassword"
                        v-on:change="verify"
                        required>
          </b-form-input>
        </b-form-group><br>

        <b-container class="bv-example-row">
          <b-row>
            <b-col>
              <b-button type="reset" variant="primary" @click="reset">
                Reset
              </b-button>
            </b-col>
            <b-col>
              <b-button type="submit" variant="danger" @click="doRegister">
                Register
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
  name: 'register',
  data () {
    return {
      msg: 'Register',
      validateAccount: null,
      validatePassword: null,
      register: {
        account: '',
        password: ''
      },
      showAlertTime: 5,
      showOnlyTime: 0,
      alert: ''

    }
  },
  methods: {
    verify  () {
      let checkAccount = this.verifyAccountText()
      let checkPassword = this.validatePasswordText()
      if (checkAccount && checkPassword) { return true } else { return false }
    },
    verifyAccountText () {
      if (!this.register.account.trim()) {
        this.validateAccount = false
        return false
      } else {
        this.register.account = this.register.account.trim()
        this.validateAccount = true
        return true
      }
    },
    validatePasswordText () {
      if (!this.register.password.trim()) {
        this.validatePassword = false
        return false
      } else {
        this.register.password = this.register.password.trim()
        this.validatePassword = true
        return true
      }
    },
    timeChanged (time) {
      this.showOnlyTime = time
    },
    doRegister: function () {
      let self = this
      if (!self.register.account.trim() || !self.register.password.trim()) {
        // this.reset()
        return
      }
      axios.post('http://localhost:3100/admins/addAdmin', this.register)
        .then(function (response) {
          self.$store.dispatch('setToken', response.data.token)
          self.$store.dispatch('setUser', response.data.admin)
          self.$router.push({path: '/admin/' + self.register.account, params: {account: self.register.account}})
        }).catch(function (error) {
          console.error(error)
          self.showOnlyTime = self.showAlertTime
          self.alert = error.response.data.error
          self.reset()
        })
    },
    reset () {
      this.register = {
        account: '',
        password: ''
      }
    }
  }
}
</script>
<style>
#registerContainer {
    max-width: 500px;
}
</style>
