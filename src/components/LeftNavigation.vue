<template>
  <nav class="sidebar" id="sidebar">
    <ul class="sidebar-list">
      <li
        v-for="list in mainList" :key="list._id"
        :class="['sidebar-list__item', {'active': activeGroup._id === list._id}]"
        @click="selectGroup(list)">
        <v-icon :class="['icon sidebar-icon', {'star' : list.icon === 'star'}]" :name="list.icon"></v-icon>
        <span>{{ list.group_name }}</span>
      </li>
    </ul>
    <div class="sidebar-hr"></div>
     <ul class="sidebar-list">
      <li
        v-for="(list, index) in userList" :key="index"
        :class="['sidebar-list__item', {'active': activeGroup._id === list._id}]"
        @click="selectGroup(list)">
        <input type="text" v-if="editableList && editableList._id === list._id" v-model="editableList.group_name">
        <div class="sidebar-list__custom" v-else>
          <div class="sidebar-list__custom-title">
            <span>{{ list.group_name }}</span>
          </div>
          <help-menu :info="list" />
        </div>
        </li>
    </ul>

    <div class="sidebar-create" title="Создать список">
      <div
        class="sidebar-list__create"
        @click="activateEditor"
        v-if="!canCreate">
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
        ref="createList"
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
import HelpMenu from './HelpMenu.vue'

export default {
  name: 'LeftNavigation',
  components: {
    HelpMenu
  },
  data () {
    return {
      canCreate: false,
      showMenu: false,
      listName: 'Список без названия',
      editableList: null
    }
  },
  computed: {
    ...mapState('todoGroup', {
      allTodoGroups: 'allTodoGroups',
      activeGroup: 'activeGroup'
    }),
    mainList () {
      return this.allTodoGroups.filter(item => item.icon !== '')
    },
    userList () {
      return this.allTodoGroups.filter(item => item.icon === '')
    }
  },
  methods: {
    ...mapActions({
      getTodoGroups: 'todoGroup/getTodoGroups'
    }),
    ...mapActions('todo', ['getTodosByGroup']),
    selectGroup (group) {
      store.dispatch('todoGroup/addSelectTodoGroup', group).then(() => {
        this.getTodosByGroup(this.activeGroup._id)
      })
    },
    activateEditor () {
      setTimeout(() => {
        this.$refs.createList.focus()
      })
      this.canCreate = true
    },
    cancelCreate () {
      this.canCreate = false
      this.listName = 'Список без названия'
    },
    createList () {
      const newList = {
        user_id: this.$store.state.auth.user.id,
        group_name: this.listName
      }
      store.dispatch('todoGroup/addTodoGroup', newList).then(() => {
        this.listName = 'Список без названия'
        this.canCreate = false
      })
    },
    openMenu () {
      this.showMenu = !this.showMenu
    }
  },
  created () {
    this.getTodoGroups().then(() => {
      store.dispatch('todoGroup/addSelectTodoGroup', this.allTodoGroups[0]).then(() => {
        this.getTodosByGroup(this.activeGroup._id)
      })
    })
  }
}
</script>
