<template>
  <div class="admin" id="admin">
    <div>
      <h1>Welcome {{this.$route.params.account}}.</h1>
    </div>
    <div class="container"> <br>
      <div>
        <span style="font-size:1cm;">This is your member list.&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <b-button  :pressed="false" variant="primary" @click="createMemberModal=true"  id="createMemberModal">Create Member</b-button>
          <b-modal
              v-model="createMemberModal"
              title="Create new member"
              @on-ok="createMember">
              <b-container fluid>
                <b-form inline>
                    <b-input-group prepend="Member name" >
                      <b-form-input  v-model="member.name"
                                     placeholder="Enter member name" required></b-form-input>
                    </b-input-group><br>

                    <b-input-group prepend="Enter member birthday" required>
                      <b-form-input  v-model="member.birthday"
                                    placeholder="YYYY/MM/DD"></b-form-input>
                    </b-input-group><br><br><br>

                    <b-input-group>
                      <b-form-radio-group id="Sex" v-model="member.sex" :options="sex" name="Sex"></b-form-radio-group>
                    </b-input-group>
                </b-form>

              </b-container>
              <div slot="modal-footer" class="w-100">
                <p class="float-right"></p>
                <b-btn  class="float-right" variant="success" @click="createMember">
                  Create
                </b-btn>
              </div>
          </b-modal>
      </div><br>
        <table  style="width:100%;">
            <thead>
                <tr>
                    <th width="5%">index</th>
                    <th width="25%">Name</th>
                    <th width="20%">Sex</th>
                    <th width="30%">Birthday</th>
                    <th width="10%"></th>
                    <th width="10%"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in members">
                    <td v-text="index+1"></td>
                    <td v-text="data.name"></td>
                    <td v-text="data.sex"></td>
                    <td v-text="data.birthday"></td>
                    <td><b-button :pressed="false" variant="primary" @click="edit(data)">Edit</b-button></td>
                    <td><b-button :pressed="false" variant="danger" @click="deleteMember(data)">Delete</b-button></td>
                </tr>
            </tbody>
        </table>
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
      sex: [
        { text: 'Man', value: 'man' },
        { text: 'Woman', value: 'woman' }
      ],
      createMemberModal: false,
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
      let self = this
      axios.get('http://localhost:3100/members?account=' + this.$route.params.account)
        .then(function (response) {
          self.members = response.data
        }).catch(function (err) {
          console.error(err)
        })
    },
    createMember () {
      let self = this
      axios.post('http://localhost:3100/members/addMember', this.member)
        .then(function (response) {
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
button{
    margin: 20px
}
table{
    margin-left: auto;
    margin-right: auto;
}
.bordered {
    width: 200px;
    height: 100px;
    padding: 20px;
    border: 1px solid darkorange;
    border-radius: 8px;
  }
</style>
