<template>
  <div class="signin" id="signin">
    <div>
      <h1>{{ msg }}</h1>
    </div><br><br>
    <b-container id="signinContainer">
      <b-alert variant="danger"
              dismissible
              fade
              :show="showOnlyTime"
              @dismissed="showOnlyTime=0"
              >
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
                    v-model="signin.account"
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
                    v-model="signin.password"
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
              <b-button   type="submit" variant="danger" @click="doSignin">
                Sign in
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
  name: 'signin',
  data () {
    return {
      msg: 'Sign in ',
      signin: {
        account: '',
        password: ''
      },
      showAlertTime: 5,
      showOnlyTime: 0,
      alert: ''

    }
  },
  methods: {
    timeChanged (time) {
      this.showOnlyTime = time
    },
    doSignin: function () {
      let self = this
      if (!self.signin.account || !self.signin.password) { return }
      axios.post('http://localhost:3100/admins/addAdmin', this.signin)
        .then(function (response) {
          if (response.data.error) {
            self.showOnlyTime = self.showAlertTime
            self.alert = response.data.error
            self.reset()
          } else {
            self.$router.push({path: '/admin/' + self.signin.account, params: {account: self.signin.account}})
          }
        }).catch(function (err) {
          console.error(err)
        })
    },
    reset () {
      this.signin = {
        account: '',
        password: ''
      }
    }
  }
}
</script>
<style>
#signinContainer {
    max-width: 500px;
}
</style>
