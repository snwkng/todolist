<template>
 <div class="todo">
   <div class="todo-header">
     <h1>
       {{activeGroup.group_name}}
       <span class='todo-header__date' v-if="activeGroup.group_name === 'Сегодня'">{{today | date}}</span>
     </h1>
   </div>
   <ul class="todo-list">
     <li v-for="todo in todosByGroup" :key="todo._id">
       <todo-editor type-editor="editEditor"  v-if="editableTodo && editableTodo._id === todo._id"></todo-editor>
       <div class="todo-list__item" v-else>
        <input type="checkbox" class="item-checkbox" v-model="todo.todo_done" @change="doneTodo(todo)" />
        <div class="item-content">
          <div class="item-content__main">
              <div :class="['item-content__main-name', { 'text-decoration-line-through color-grey' : todo.todo_done }]">{{ todo.todo_name }}</div>
          <div class="item-content__main-option"></div>
          </div>
          <div :class="['item-content__other', { 'color-grey' : todo.todo_done }]">
            <v-icon class="item-content__other-icon" name="calendar"></v-icon>
            <span class="item-content__other-text">{{ todo.todo_date | date }}</span>
          </div>
        </div>
        <div class="item-options">
          <div class="item-options__option" :title="todo.in_favorites ? 'Убрать из избранного' : 'Добавить в избранное'" @click="addOrRemoveFavorites(todo)" v-if="activeGroup.group_name !== 'Избранное'">
            <v-icon :class="['icon star', {'active-star': todo.in_favorites}]" name="star"></v-icon>
          </div>
          <div class="item-options__option" title="Редактировать" @click="editTodo(todo)">
            <v-icon class="icon" name="edit-3"></v-icon>
          </div>
          <div class="item-options__option" title="Удалить" @click="todo.in_favorites && activeGroup.group_name === 'Избранное' ? removeFromFavoritesModalShow(todo) : deleteTodo(todo)">
            <v-icon class="icon" name="trash-2"></v-icon>
          </div>
<!--          <div class="item-options__option" title="other settings">-->
<!--            <v-icon class="icon" name="more-horizontal"></v-icon>-->
<!--          </div>-->
        </div>
       </div>
     </li>
   </ul>

  <div
    class="create-todo-editor"
    v-if="showCreateTodoEditor">
    <todo-editor type-editor="createEditor" :focus-editor="this.focusEditor" @cancelCreate="showCreateTodoEditor = false"></todo-editor>
  </div>
   <div class="create-todo" @click="createTodo" v-else>
     <svg width="14" height="14" class="sidebar-icon create-todo__icon">
        <path
          d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
          fill="currentColor"
          fill-rule="evenodd">
        </path>
      </svg>
      <span class="create-todo__name">Добавить задачу</span>
   </div>
 </div>
</template>

<script>
import store from '@/store'
import { mapState, mapGetters, mapActions } from 'vuex'
import TodoEditor from './TodoEditor.vue'

export default {
  components: { TodoEditor },
  name: 'Todo',
  data () {
    return {
      showCreateTodoEditor: false,
      done: false,
      focusEditor: false
    }
  },
  computed: {
    ...mapState('todo', ['todosByGroup', 'todoEditor']),
    ...mapState('todoGroup', ['activeGroup']),
    ...mapGetters({
      favorite: 'todoGroup/favorite'
    }),
    today () {
      return Date.now()
    },
    editableTodo: {
      get () {
        return store.state.todo.editableTodo
      },
      set (editTodoValue) {
        store.dispatch('todo/updateEditableTodo', editTodoValue)
      }
    }
  },
  methods: {
    ...mapActions('todo', ['getTodos', 'getTodosByGroup']),
    createTodo () {
      this.showCreateTodoEditor = true
    },
    deleteTodo (todo) {
      store.dispatch('todo/deleteTodo', todo)
    },
    doneTodo (todo) {
      store.dispatch('todo/updateTodo', todo).then(() => {
        if (typeof todo === 'object') {
          this.editableTodo = null
        }
      })
    },
    editTodo (todo) {
      store.dispatch('todo/updateTodoValue', todo.todo_name).then(() => {
        this.editableTodo = Object.assign({}, todo)
      })
    },
    addOrRemoveFavorites (todo) {
      if (todo.in_favorites) {
        const index = todo.todo_group.indexOf(this.favorite._id)
        todo.todo_group.splice(index, 1)
        todo.in_favorites = false
      } else {
        todo.todo_group.push(this.favorite._id)
        todo.in_favorites = true
      }
      store.dispatch('todo/updateTodo', todo)
    },
    removeFromFavoritesModalShow (todo) {
      store.dispatch('modal/SET_SHOW_MODAL', {
        showModal: true,
        modalType: 'delete todo'
      }).then(() => {
        store.dispatch('modal/SET_MODAL_INFO', todo)
      })
    }
  },
  created () {
    this.getTodos()
  }
}
</script>
