<template>
  <nav class="sidebar" id="sidebar">
    <ul class="sidebar-list">
      <li
        v-for="list in mainList" :key="list.group_name"
        :class="['sidebar-list__item', {'active': activeGroup._id === list._id}]"
        @click="selectGroup(list)">
        <v-icon class="icon sidebar-icon" :name="list.icon"></v-icon>
        <span>{{ list.group_name }}</span>
      </li>
    </ul>
    <div class="sidebar-hr"></div>
     <ul class="sidebar-list">
      <li
        v-for="(list, index) in userList" :key="index"
        :class="['sidebar-list__item', {'active': activeGroup._id === list._id}]"
        @click="selectGroup(list)">
        <div class="sidebar-circle"></div>
        <span>{{ list.group_name }}</span>
        </li>
    </ul>

    <div class="sidebar-create" title="Создать список">
      <div
        class="sidebar-list__create"
        @click="activateEditor"
        v-if="!canCreate">
        <!-- <font-awesome-icon class="sidebar-icon" icon="plus" /> -->
        <svg width="14" height="14" class="sidebar-icon">
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
        class="editor create-list__editor"
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
    ...mapState('todoGroup', ['allTogosGroup', 'activeGroup']),
    mainList () {
      return this.allTogosGroup.filter(item => item.icon !== '')
    },
    userList () {
      return this.allTogosGroup.filter(item => item.icon === '')
    }
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
      this.canCreate = true
    },
    cancelCreate () {
      this.canCreate = false
      this.listName = 'Список без названия'
    },
    createList () {
      const newList = {
        group_name: this.listName
      }
      store.dispatch('todoGroup/ADD_GROUP', newList).then(() => {
        this.listName = 'Список без названия'
        this.canCreate = false
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
