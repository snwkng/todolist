<template>
  <nav class="sidebar">
    <ul class="sidebar-list" v-for="group in allTogosGroup" :key="group.group_name">
      <li
        :class="['sidebar-list__item', {'active': activeGroup._id === group._id}]"
        @click="selectGroup(group)"
        v-if="group.icon">
        <!-- <svg>
          <path
            d="M20,3 L19,3 L19,1 L17,1 L17,3 L7,3 L7,1 L5,1 L5,3 L4,3 C2.9,3 2,3.9 2,5 L2,21 C2,22.1 2.9,23 4,23 L20,23 C21.1,23 22,22.1 22,21 L22,5 C22,3.9 21.1,3 20,3 Z M20,21 L4,21 L4,10 L20,10 L20,21 Z M20,8 L4,8 L4,5 L20,5 L20,8 Z"
            fill="#1D1D1D">
            </path>
        </svg> -->
        <font-awesome-icon class="sidebar-icon" :icon="group.icon" />
        <span>{{ group.group_name }}</span>
        </li>
    </ul>
    <div class="sidebar-hr"></div>

     <ul class="sidebar-list" v-for="(group, index) in allTogosGroup" :key="index">
      <li
        :class="['sidebar-list__item', {'active': activeGroup._id === group._id}]"
        @click="selectGroup(group)"
        v-if="!group.icon">
        <div class="sidebar-circle"></div>
        <span>{{ group.group_name }}</span>
        </li>
    </ul>

    <div class="sidebar-create" title="Создать список">
      <div
        class="sidebar-list__create"
        @click="activateEditor"
        v-if="!canCreate">
        <!-- <font-awesome-icon class="sidebar-icon" icon="plus" /> -->
        <svg width="15" height="15" class="sidebar-icon">
          <path
            d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
            fill="currentColor"
            fill-rule="evenodd">
          </path>
        </svg>
        <span>Создать список</span>
      </div>
      <div
        class="sidebar-list__create-active"
        v-else>
        <input
        type="text"
        class="create-list__input"
        v-model="listName"
        @keydown.esc="cancelCreate">
        <div class="create-list__options">
          <button type="button" class="create" @click="createList">Создать</button>
          <button type="button" class="cancel" @click="cancelCreate">Отмена</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import store from '@/store'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LeftNavigation',
  data () {
    return {
      canCreate: false,
      listName: 'Список без названия'
    }
  },
  computed: {
    ...mapState('todoGroup', ['allTogosGroup', 'activeGroup'])
  },
  methods: {
    ...mapActions('todoGroup', ['GET_TODOS_GROUP']),
    ...mapActions('todo', ['GET_TODOS_BY_GROUP']),
    selectGroup (group) {
      store.dispatch('todoGroup/ADD_SELECT_GROUP', group).then(() => {
        this.GET_TODOS_BY_GROUP(this.activeGroup._id)
      })
    },
    activateEditor () {
      this.canCreate = !this.canCreate
    },
    cancelCreate () {
      this.canCreate = !this.canCreate
    },
    createList () {
      const newList = {
        group_name: this.listName
      }
      store.dispatch('todoGroup/ADD_GROUP', newList).then(() => {
        this.listName = 'Список без названия'
        this.canCreate = !this.canCreate
      })
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
