<template>
  <nav class="sidebar">
    <ul class="sidebar-list" v-for="group in allTogosGroup" :key="group.group_name">
      <li :class="['sidebar-list__item', {'active': active === group._id}]" @click="active = group._id">
        <font-awesome-icon class="sidebar-icon" :icon="group.icon" />
        <span>{{ group.group_name }}</span>
        </li>
    </ul>
    <div class="sidebar-hr"></div>
  </nav>
</template>

<script>
// import store from '@/store'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'LeftNavigation',
  data () {
    return {
      active: null
    }
  },
  computed: {
    ...mapState('todoGroup', ['allTogosGroup'])
  },
  methods: {
    ...mapActions('todoGroup', ['GET_TODOS_GROUP'])
  },
  created () {
    this.GET_TODOS_GROUP().then(() => {
      this.active = this.allTogosGroup[0]._id
    })
  }
}
</script>
