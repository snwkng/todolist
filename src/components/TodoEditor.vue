<template>
  <div>
    <div class="todo-editor">
      <textarea
        autocorrect="on"
        ref="focusTodoEditor"
        type="text"
        class="editor todo-editor__area"
        v-model="todoEditor"
        @keydown.esc="cancelCreate"
        @keydown.ctrl.enter="addTodo"
      ></textarea>
    </div>
    <div class="create-list__options">
      <button type="button" class="create" @click="doneTodo(editableTodo)">
        Сохранить
      </button>
      <button type="button" class="cancel" @click="cancelCreate">Отмена</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'
export default {
  name: 'TodoEditor',
  computed: {
    ...mapState('todoGroup', {
      activeGroup: 'activeGroup'
    }),
    todoEditor: {
      get () {
        return store.state.todo.todoEditor
      },
      set (todoValue) {
        store.dispatch('todo/updateTodoValue', todoValue)
      }
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
    cancelCreate () {
      this.$emit('cancelCreate')
      this.todoEditor = ''
      this.editableTodo = null
    },
    addTodo () {
      const todo = {
        todo_name: this.todoEditor,
        todo_group: this.activeGroup._id,
        todo_date: Date.now
      }
      store.dispatch('todo/createTodo', todo).then(() => {
        this.showCreateTodoEditor = false
        this.todoEditor = ''
      })
    },
    doneTodo (todo) {
      store.dispatch('todo/updateTodo', todo).then(() => {
        if (typeof todo === 'object') {
          this.editableTodo = null
        }
      })
    }
  }
}
</script>
