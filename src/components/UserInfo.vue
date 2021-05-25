<template>
  <div class='position-relative' @click='showMenu = !showMenu'>
    <div class='user-info'>
      <div class='user-info__name'>
        {{ userInfo.name }}
      </div>
      <div class='user-info__avatar'>
        <img class='img-responsive' src='../assets/images/avatar.png' alt='avatar'>
      </div>
      <v-icon class='user-info__icon' name='chevron-down'></v-icon>
    </div>
    <div class='test' v-on-clickaway="clickAway" v-if='showMenu'>

    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapState } from 'vuex'

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
    // bug
    clickAway () {
      this.showMenu = false
    }
  }
}
</script>
<style>
.test {
  background: white;
  min-width: 300px;
  height: 200px;
  position: absolute;
  z-index: 2000;
  border: 1px solid black;
  right: 0
}
</style>
