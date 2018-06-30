
<template>
    <b-navbar id="nav" toggleable="md" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <router-link to="/">
        <b-navbar-brand>
                    Home
        </b-navbar-brand>
    </router-link>
    <b-navbar-nav>
        <b-nav-item>
            <b-button :pressed="false"
                      size="sm"
                      @click="toUserPage"
                      v-if="$store.state.isUserLogin">
                Manage
            </b-button>
        </b-nav-item>
    </b-navbar-nav>
  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav class="ml-auto">
        <b-navbar-nav>
            <b-nav-item  dark>
                <b-button :pressed="false"
                          variant="primary"
                          size="sm"
                          to="/register"
                          v-if="!$store.state.isUserLogin">
                    Sign up
                </b-button>

                <b-button :pressed="false"
                          variant="primary"
                          size="sm"
                          to="/login"
                          v-if="!$store.state.isUserLogin" >
                    Log in
                </b-button>

                <b-button :pressed="false"
                          variant="primary"
                          size="sm"
                          to="/"
                          v-if="$store.state.isUserLogin"
                          @click="logout">
                    Log out
                </b-button>

            </b-nav-item>
        </b-navbar-nav>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push('/')
    },
    toUserPage () {
      console.log('sttttttt')
      console.log(this.$store.state.user)

      let account = this.$store.state.user.account
      this.$router.push({path: '/admin/' + account, params: {account: account}})
    }
  }
}
</script>

<style>
#nav{
    position:fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:0; /* 距离窗口顶部距离 */
    left:0; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    height:40px; /* 高度 */
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
}
</style>
