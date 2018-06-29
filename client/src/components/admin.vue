<template>
  <div class="admin" id="admin">
    <div>
      <h1>Welcome to here, {{this.$route.params.account}}</h1>
    </div>
    <div class="container" style="vertical-align: center;"> <br>
      <div>
        <span style="font-size:1cm;">This is your member list.&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <b-button  :pressed="false" variant="primary" @click="createMemberModal=true"  id="createMemberModal">Create Member</b-button>
          <b-modal centered
              v-model="createMemberModal"
              title="Create new member">
              <b-container fluid >
                <b-form>
                  <b-form-group id="memberName"
                                horizontal
                                :label-cols="5"
                                breakpoint="md"
                                label="Member name"
                                label-for="memberNameInput">
                    <b-form-input id="memberNameInput"
                                  type="text"
                                  v-model="member.name"
                                  placeholder="Enter member name"
                                  :state="validateName"
                                  v-on:change="verify">
                    </b-form-input>
                  </b-form-group>

                  <b-form-group id="memberBirthday"
                                horizontal
                                :label-cols="5"
                                breakpoint="md"
                                label="Member birthday"
                                label-for="memberBirthdayInput">
                    <b-form-input id="memberBirthdayInput"
                              type="text"
                              v-model="member.birthday"
                              placeholder="YYYY/MM/DD"
                              :state="validateBirthday"
                              v-on:change="verify">
                    </b-form-input>
                  </b-form-group>
                  <b-form-group id="memberSex"
                                horizontal
                                :label-cols="5"
                                breakpoint="md"
                                label="Member Sex"
                                label-for="memberSexRadio">
                    <b-form-radio-group id="memberSexRadio"
                                        v-model="member.sex"
                                        :options="sex">
                    </b-form-radio-group>
                  </b-form-group>

                </b-form>

              </b-container>
              <div slot="modal-footer" class="w-100">
                <b-container class="bv-example-row">
                  <b-row>
                    <b-col>
                      <b-button type="reset" variant="danger" @click="reset">
                        Reset
                      </b-button>
                    </b-col>
                    <b-col>
                      <b-button type="submit" variant="primary" @click="createMember">
                        Create
                      </b-button>
                    </b-col>
                  </b-row>
                </b-container>
              </div>
          </b-modal>
      </div><br>

       <b-table :items="members" :fields="fields">
        <template slot="No." slot-scope="data">
          {{data.index + 1}}
        </template>
        <template slot="edit" slot-scope="data">
          <b-button :pressed="false" variant="primary" @click="edit(data.item)">edit</b-button>
        </template>
        <template slot="delete" slot-scope="data">
          <b-button :pressed="false" variant="danger" @click="deleteMember(data.item)">Delete</b-button>
        </template>
      </b-table>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'admin',
  mounted () {
    this.getMembers()
  },
  data () {
    return {
      msg: 'Welcome ',
      show: true,
      validateName: null,
      validateBirthday: null,
      sex: [
        { text: 'Man', value: 'man' },
        { text: 'Woman', value: 'woman' }
      ],
      createMemberModal: false,
      fields: [ 'No.', 'name', 'sex', 'birthday', 'edit', 'delete' ],
      members: [],
      member: {
        name: '',
        sex: 'man',
        birthday: '',
        admin: this.$route.params.account
      }

    }
  },
  methods: {
    getMembers () {
      console.log(this.$route.params)
      let self = this
      axios.get('http://localhost:3100/members?account=' + this.$route.params.account)
        .then(function (response) {
          self.members = response.data
          console.log(self.members)
        }).catch(function (err) {
          console.error(err)
        })
    },
    reset () {
      this.member = {
        name: '',
        sex: 'man',
        birthday: '',
        admin: this.$route.params.account
      }
      this.validateName = null
      this.validateBirthday = null
    },
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
        this.validateName = true
        return true
      }
    },
    validateBirthdayText () {
      if (!this.member.birthday.trim()) {
        this.validateBirthday = false
        return false
      } else {
        this.validateBirthday = true
        return true
      }
    },
    createMember () {
      let self = this
      console.log(self.verify())
      if (!self.verify()) { return }
      axios.post('http://localhost:3100/members/addMember', this.member)
        .then(function (response) {
          self.reset()
          return self.getMembers()
        }).catch(function (err) {
          console.error(err)
        })
      this.createMemberModal = false
    },
    edit (member) {
      console.log('edit')
      console.log(member)
      this.$router.push({path: '/member/edit/' + member._id, params: {member_id: member._id}})
    },
    deleteMember (member) {
      console.log('deleteMember')
      let self = this
      console.log(member._id)
      axios.delete('http://localhost:3100/members/delete/' + member._id)
        .then(function (response) {
          return self.getMembers()
        }).catch(function (err) {
          console.error(err)
        })
    }

  }

}
</script>
<style>

</style>
