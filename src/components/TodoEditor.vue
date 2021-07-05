<template>
  <div>
    <div class="todo-editor">
      <textarea
        ref="focusTodoEditor"
        class="editor todo-editor__area"
        v-model="todoEditor"
        @keydown.esc="cancelCreate"
        @keydown.enter="typeEditor === 'createEditor' ? addTodo() : doneTodo(editableTodo)">
      </textarea>
      <div class='todo-editor__helpers'>
        <div class="todo-editor__helpers-item" @click="datePicker = true">
          <v-icon class="icon" name="clock"></v-icon>
          <span class="todo-editor__helpers-item-text"> Срок</span>
        </div>
        <div class="todo-editor__helpers-item">
          <v-icon class="icon" name="inbox"></v-icon>
          <span class="todo-editor__helpers-item-text"> {{ allTodoGroups[0].group_name }}</span>
        </div>
      </div>

      <todo-editor-date-picker v-if="datePicker" @closeDatePicker="datePicker = false" />
    </div>
    <div class="create-list__options">
      <button type="button" class="create" @click="typeEditor === 'createEditor' ? addTodo() : doneTodo(editableTodo)">
        Сохранить
      </button>
      <button type="button" class="cancel" @click="cancelCreate">Отмена</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'
import TodoEditorDatePicker from './TodoEditorDatePicker'
export default {
  name: 'TodoEditor',
  components: {
    TodoEditorDatePicker
  },
  props: {
    typeEditor: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data () {
    return {
      datePicker: false
    }
  },
  computed: {
    ...mapState('todoGroup', {
      activeGroup: 'activeGroup',
      allTodoGroups: 'allTodoGroups'
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
  watch: {
    'activeGroup.group_name' (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.cancelCreate()
      }
    }
  },
  methods: {
    focusInput () {
      this.$refs.focusTodoEditor.focus()
    },
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
        // this.$emit('cancelCreate')
        this.todoEditor = ''
      })
    },
    doneTodo (todo) {
      todo.todo_name = this.todoEditor
      store.dispatch('todo/updateTodo', todo).then(() => {
        this.todoEditor = ''
        if (typeof todo === 'object') {
          this.editableTodo = null
        }
      })
    }
  },
  mounted () {
    this.focusInput()
  }
}
</script>
