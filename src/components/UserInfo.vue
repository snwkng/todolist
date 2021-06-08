<template>
  <div class="position-relative">
    <div class="user-info" @click="showMenu = !showMenu">
      <div class="user-info__name">
        {{ userInfo.name }}
      </div>
      <div class="user-info__avatar">
        <img
          class="user-avatar"
          :src="require(`../assets/images/avatars/${userInfo.avatar}`)"
          alt="avatar"
        />
      </div>
      <v-icon class="user-info__icon" name="chevron-down"></v-icon>
    </div>
    <div class="top-menu" v-on-clickaway="clickAway" v-if="showMenu">
      <router-link to="/user/account" class="top-menu-user-section">
        <div class="top-menu-user-section__user">
          <img
            class="user-avatar"
            :src="require(`../assets/images/avatars/${userInfo.avatar}`)"
            alt="avatar"
          />
          <div class="top-menu-user-section__info">
            <span>{{ userInfo.name }}</span>
            <span>test@test.test</span>
          </div>
        </div>
        <div class="top-menu-user-section__settings">
          <v-icon class="logout__icon" name="settings"></v-icon>
          <span class="logout__text">Настройки</span>
        </div>
      </router-link>
      <hr />
      <div class="top-menu-options-section">
        <button class="logout" @click="logOut" title="logout">
          <v-icon class="logout__icon" name="log-out"></v-icon>
          <span class="logout__text">Выйти</span>
        </button>
      </div>
      <hr />
        <input type="file" ref="avatar" name="avatar" @change="uploadFiles"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mixin as clickaway } from 'vue-clickaway'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UserInfo',
  mixins: [clickaway],
  data () {
    return {
      showMenu: false
    }
  },
  computed: {
    ...mapState('auth', {
      userInfo: 'user'
    })
  },
  methods: {
    ...mapActions({
      logOutUser: 'auth/logOut'
    }),
    clickAway () {
      this.showMenu = false
    },
    logOut () {
      this.logOutUser().then(() => {
        this.$router.replace({
          name: 'Login'
        })
      })
    },

    uploadFiles () {
      const formData = new FormData()
      formData.append('avatar', this.$refs.avatar.files[0])
      formData.append('_id', this.userInfo.id)
      axios.put('auth/user/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(function () {
        console.log('SUCCESS!!')
      }).catch(function () {
        console.log('FAILURE!!')
      })
    }
  }
}
</script>
