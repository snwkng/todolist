<template>
  <div id="nav" class="navbar">
  <button class="navbar__btn" @click="toggleSidebar">
    <svg class="menu_icon" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" fill-rule="evenodd" d="M4.5 5h15a.5.5 0 1 1 0 1h-15a.5.5 0 0 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1z">
      </path>
    </svg>
  </button>
    <div class="navbar-right-menu" @click="logOut">
      <v-icon class="navbar-right-menu__icon" name="log-out"></v-icon>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Navbar',
  data () {
    return {
      showSidebar: true
    }
  },
  methods: {
    ...mapActions({
      logOutUser: 'auth/logOut'
    }),

    toggleSidebar () {
      this.showSidebar = !this.showSidebar
      const sidebar = document.getElementById('sidebar')
      const main = document.getElementById('main')

      if (this.showSidebar) {
        sidebar.style.left = '0'
        main.style.marginLeft = '300px'
      } else {
        sidebar.style.left = '-400px'
        main.style.marginLeft = '0'
      }
    },
    logOut () {
      this.logOutUser().then(() => {
        this.$router.replace({
          name: 'Login'
        })
      })
    }
  }
}
</script>
