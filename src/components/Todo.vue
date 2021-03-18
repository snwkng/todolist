<template>
 <div class="todo">
   <div class="todo-header">
     <h1>{{activeGroup.group_name}}</h1>
   </div>
   <ul class="todo-list">
     <li class="todo-list__item" v-for="todo in todosByGroup" :key="todo._id">
       <input type="checkbox" class="item-checkbox" />
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
         <div class="item-options__option" title="edit">
           <v-icon class="icon" name="edit-3"></v-icon>
         </div>
         <div class="item-options__option" title="delete" @click="deleteTodo(todo)">
           <v-icon class="icon" name="trash-2"></v-icon>
         </div>
         <div class="item-options__option" title="other settings">
           <v-icon class="icon" name="more-horizontal"></v-icon>
         </div>
       </div>
     </li>
   </ul>

  <div
    class="create-todo-editor"
    v-if="showCreateTodoEditor">
    <div class="todo-editor">
      <textarea
        autocorrect="on"
        autofocus
        type="text"
        class="editor todo-editor__area"
        v-model="todo"
        @keydown.esc="cancelCreate">
      </textarea>
    </div>
    <div class="create-list__options">
      <button type="button" class="create" @click="addTodo">Создать</button>
      <button type="button" class="cancel" @click="cancelCreate">Отмена</button>
    </div>
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

export default {
  name: 'Todo',
  data () {
    return {
      showCreateTodoEditor: false,
      todo: '',
      done: false
    }
  },
  computed: {
    ...mapState('todo', ['todosByGroup']),
    ...mapState('todoGroup', ['activeGroup'])
  },
  methods: {
    ...mapActions('todo', ['GET_TODOS', 'GET_TODOS_BY_GROUP']),
    createTodo () {
      this.showCreateTodoEditor = true
    },
    cancelCreate () {
      this.showCreateTodoEditor = false
      this.todo = ''
    },
    addTodo () {
      const todo = {
        todo_name: this.todo,
        todo_group: this.activeGroup._id
      }
      store.dispatch('todo/CREATE_TODO', todo).then(() => {
        this.showCreateTodoEditor = false
        this.todo = ''
      })
    },
    deleteTodo (todo) {
      store.dispatch('todo/DELETE_TODO', todo)
    }
  },
  created () {
    this.GET_TODOS()
  }
}
</script>
