<template>
  <nav class="sidebar">
    <ul class="sidebar-list" v-for="group in allTogosGroup" :key="group.group_name">
      <li :class="['sidebar-list__item', {'active': activeGroup._id === group._id}]" @click="selectGroup(group)">
        <font-awesome-icon class="sidebar-icon" :icon="group.icon" />
        <span>{{ group.group_name }}</span>
        </li>
    </ul>
    <div class="sidebar-hr"></div>
  </nav>
</template>

<script>
import store from '@/store'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'LeftNavigation',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('todoGroup', ['allTogosGroup', 'activeGroup'])
  },
  methods: {
    ...mapActions('todoGroup', ['GET_TODOS_GROUP']),
    ...mapActions('todo', ['GET_TODOS_BY_GROUP']),
    selectGroup (group) {
      store.dispatch('todoGroup/ADD_SELECT_GROUP', group)
    }
  },
  created () {
    this.GET_TODOS_GROUP().then(() => {
      store.dispatch('todoGroup/ADD_SELECT_GROUP', this.allTogosGroup[0]).then(() => {
        this.GET_TODOS_BY_GROUP(this.activeGroup._id)
      })
    })
  }
}
</script>
