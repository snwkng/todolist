<template>
 <div class="todo">
   <div class="todo-header">
     <h1>{{activeGroup.group_name}}</h1>
   </div>
   <ul class="todo-list">
     <li v-for="todo in todosByGroup" :key="todo._id">
       <todo-editor  v-if="editableTodo && editableTodo._id === todo._id"></todo-editor>
       <div class="todo-list__item" v-else>
        <input type="checkbox" class="item-checkbox" v-model="todo.todo_done" @change="doneTodo(todo)" />
        <div class="item-content">
          <div class="item-content__main">
              <div class="item-content__main-name">{{ todo.todo_name }}</div>
          <div class="item-content__main-option"></div>
          </div>
          <div class="item-content__other">
            <v-icon class="item-content__other-icon" name="calendar"></v-icon>
            <span class="item-content__other-text">18 марта</span>
          </div>
        </div>
        <div class="item-options">
          <div class="item-options__option" title="edit" @click="editTodo(todo)">
            <v-icon class="icon" name="edit-3"></v-icon>
          </div>
          <div class="item-options__option" title="delete" @click="deleteTodo(todo)">
            <v-icon class="icon" name="trash-2"></v-icon>
          </div>
          <div class="item-options__option" title="other settings">
            <v-icon class="icon" name="more-horizontal"></v-icon>
          </div>
        </div>
       </div>
     </li>
   </ul>

  <div
    class="create-todo-editor"
    v-if="showCreateTodoEditor">
    <todo-editor @cancelCreate="showCreateTodoEditor = false"></todo-editor>
  </div>
   <div class="create-todo" v-else>
     <svg width="14" height="14" class="sidebar-icon create-todo__icon">
        <path
          d="M6 6V.5a.5.5 0 0 1 1 0V6h5.5a.5.5 0 1 1 0 1H7v5.5a.5.5 0 1 1-1 0V7H.5a.5.5 0 0 1 0-1H6z"
          fill="currentColor"
          fill-rule="evenodd">
        </path>
      </svg>
      <span class="create-todo__name" @click="createTodo">Добавить задачу</span>
   </div>
 </div>
</template>

<script>
import store from '@/store'
import { mapState, mapActions } from 'vuex'
import TodoEditor from './TodoEditor.vue'

export default {
  components: { TodoEditor },
  name: 'Todo',
  data () {
    return {
      showCreateTodoEditor: false,
      done: false
    }
  },
  computed: {
    ...mapState('todo', ['todosByGroup', 'todoEditor']),
    ...mapState('todoGroup', ['activeGroup']),
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
    focusInput () {
      console.log(this.$refs.focusTodoEditor)
      if (this.$refs.editTodo && this.$refs.editTodo.length > 0) {
        this.$refs.editTodo[0].focus()
      }
      if (this.$refs.addTodo) {
        this.$refs.addTodo.focus()
      }
    },
    createTodo () {
      setTimeout(() => {
        this.focusInput()
      })
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
      setTimeout(() => {
        this.focusInput()
      })
      store.dispatch('todo/updateTodoValue', todo.todo_name).then(() => {
        this.editableTodo = Object.assign({}, todo)
      })
    }
  },
  created () {
    this.getTodos()
  },
  mounted () {
    this.focusInput()
  }
}
</script>
