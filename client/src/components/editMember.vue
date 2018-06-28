<template>
  <div class="edit" id="edit">
    <div>
      <h1>Edit Member page</h1>
    </div>
    <div class="container"> <br>
      <div>
        <b-form >
          <b-form-group id="memberName"
                horizontal
                :label-cols="4"
                breakpoint="md"
                label="Member name"
                label-for="memberNameInput">
            <b-form-input id="memberNameInput"
                      type="text"
                      v-model="member.name"
                      required>
            </b-form-input>
          </b-form-group>

          <b-form-group id="memberBirthday"
                        horizontal
                        :label-cols="4"
                        label="Birthday"
                        label-for="memberBirthdayInput">
            <b-form-input id="memberBirthdayInput"
                          type="text"
                          v-model="member.birthday"
                          required>
            </b-form-input>
          </b-form-group>
          <b-form-group id="memberSex"
                        horizontal
                        :label-cols="4"
                        label="Sex"
                        label-for="SexRadio">
            <b-input-group>
              <b-form-radio-group id="SexRadio" v-model="member.sex" :options="sex" name="Sex"></b-form-radio-group>
            </b-input-group>
          </b-form-group>
          <div>
          <b-btn  class="float-left" variant="primary" @click="getMember">
            Reset
          </b-btn>
          </div>
          <b-btn  class="float-right" variant="danger" @click="editMember">
            Update
          </b-btn>
        </b-form>
      </div><br>
    </div>
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
      ]

    }
  },
  methods: {
    getMember () {
      let self = this
      axios.get('http://localhost:3100/members/edit/' + this.$route.params.member_id)
        .then(function (response) {
          self.member = response.data[0]
        }).catch(function (err) {
          console.error(err)
        })
    },
    editMember () {
      let self = this
      console.log('edit')
      console.log(this.member)
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
