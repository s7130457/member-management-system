<template>
  <div class="edit" id="edit">
    <div>
      <h1>Edit Member page</h1>
    </div><br>
    <b-container id="loginContainer">
      <b-form >
        <b-form-group id="memberName"
              horizontal
              :label-cols="6"
              breakpoint="md"
              label="Member name"
              label-for="memberNameInput">
          <b-form-input id="memberNameInput"
                    type="text"
                    v-model="member.name"
                    :state="validateName"
                    placeholder="Enter member name"
                    v-on:change="verify">
          </b-form-input>
        </b-form-group>

        <b-form-group id="memberBirthday"
                      horizontal
                      :label-cols="6"
                      label="Birthday"
                      label-for="memberBirthdayInput">
          <b-form-input id="memberBirthdayInput"
                        type="text"
                        v-model="member.birthday"
                        :state="validateBirthday"
                        placeholder="YYYY/MM/DD"
                        v-on:change="verify">
          </b-form-input>
        </b-form-group>

        <b-form-group id="memberSex"
                      horizontal
                      :label-cols="6"
                      label="Sex"
                      label-for="SexRadio">
          <b-input-group>
            <b-form-radio-group id="SexRadio"
                                v-model="member.sex"
                                :options="sex">
            </b-form-radio-group>
          </b-input-group>
        </b-form-group>
      </b-form>
      <div slot="modal-footer" class="w-100">
          <b-container class="bv-example-row">
            <b-row>
              <b-col>
                <b-button type="reset" variant="danger" @click="getMember">
                  Reset
                </b-button>
              </b-col>
              <b-col>
                <b-button type="submit" variant="primary" @click="update">
                  Update
                </b-button>
              </b-col>
            </b-row>
          </b-container>
        </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'admin',
  mounted () {
    this.getMember()
  },
  data () {
    return {
      member: {},
      sex: [
        { text: 'Man', value: 'man' },
        { text: 'Woman', value: 'woman' }
      ],
      validateName: null,
      validateBirthday: null
    }
  },
  methods: {
    verify  () {
      let checkName = this.verifyNameText()
      let checkBirthday = this.validateBirthdayText()
      if (checkName && checkBirthday) { return true } else { return false }
    },
    verifyNameText () {
      if (!this.member.name.trim()) {
        this.validateName = false
        return false
      } else {
        this.member.name = this.member.name.trim()
        this.validateName = true
        return true
      }
    },
    validateBirthdayText () {
      if (!this.member.birthday.trim()) {
        this.validateBirthday = false
        return false
      } else {
        this.member.birthday = this.member.birthday.trim()
        this.validateBirthday = true
        return true
      }
    },
    getMember () {
      let self = this
      axios.get('http://localhost:3100/members/edit/' + this.$route.params.member_id)
        .then(function (response) {
          self.member = response.data[0]
        }).catch(function (err) {
          console.error(err)
        })
    },
    update () {
      let self = this
      if (!self.verify()) { return }
      axios.put('http://localhost:3100/members/editMember', this.member)
        .then(function (response) {
          self.$router.push({path: '/admin/' + self.member.admin, params: {account: self.member.admin}})
        }).catch(function (err) {
          console.error(err)
        })
    }
  }

}
</script>
<style>
#loginContainer {
    max-width: 500px;
}
</style>
