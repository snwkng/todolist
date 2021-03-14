<template>
 <div class="todo">
   <div class="todo-header">
     <h1>{{activeGroup.group_name}}</h1>
   </div>
   <ul class="todo-list">
     <li class="todo-list__item">
       <input type="checkbox" class="item-checkbox" />
       <div class="item-content">
         <div class="item-content__main">
            <div class="item-content__main-name">Ирка пупок</div>
         <div class="item-content__main-option"></div>
         </div>
         <div class="item-content__other">
           <span class="item-content__other-icon material-icons">event</span>
           <span class="item-content__other-text">18 марта</span>
         </div>
       </div>
     </li>
     <li class="todo-list__item">
       <input type="checkbox" class="item-checkbox" />
       <div class="item-content">
         <div class="item-content__main">
            <div class="item-content__main-name">Сказать Ирке что она ЖОПА</div>
         <div class="item-content__main-option"></div>
         </div>
         <div class="item-content__other">
           <span class="item-content__other-icon material-icons">event</span>
           <span class="item-content__other-text">18 марта</span>
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
// import store from '@/store'
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
    ...mapState('todo', ['todos']),
    ...mapState('todoGroup', ['activeGroup'])
  },
  methods: {
    ...mapActions('todo', ['GET_TODOS', 'GET_TODOS_BY_GROUP']),
    createTodo () {
      this.showCreateTodoEditor = true
    },
    cancelCreate () {
      this.showCreateTodoEditor = false
    },
    addTodo () {

    }
  },
  created () {
    this.GET_TODOS()
  }
}
</script>
