<template>
  <transition name='modal'>
    <div class='modal-mask'>
      <div class='modal-wrapper'>
        <div class='modal-container'>

          <div class='modal-header'>
            <slot name='header'>
              <div class='modal-header__title' v-if="modalType === 'delete'">
                <h3>Удалить группу</h3>
                <v-icon name='info' />
              </div>
              <div class='modal-header__title' v-if="modalType === 'edit'">
                <h3>Редактировать группу</h3>
                <v-icon name='info' />
              </div>
              <div class='modal-header__title' v-if="modalType === 'delete todo'">
                <h3>Удалить</h3>
                <v-icon name='info' />
              </div>
            </slot>
          </div>

          <div class='modal-body'>
            <slot name='body'>
              <div v-if="modalType === 'delete'">
                <span>Вы дейтсвительно хотите удалить <strong
                  class='text-danger'>{{ modalInfo.group_name }}</strong></span>
              </div>
              <div class='modal-body__edit' v-if="modalType === 'edit'">
                <label for='edit-name'>Название </label>
                <input
                  id='edit-name'
                  type='text'
                  ref='editName'
                  v-model='modalInfo.group_name'
                  @keyup.enter='saveData'>
              </div>
              <div v-if="modalType === 'delete todo'">
                <span>Вы дейтсвительно хотите удалить <strong
                  class='text-danger'>{{ modalInfo.todo_name }}</strong></span>
              </div>
            </slot>
          </div>

          <div class='modal-footer'>
            <slot name='footer'>
              <div class='d-flex'>
                <button type='button' class='cancel' @click="$emit('close')">Отмена</button>
                <button type='button' class='delete' v-if="modalType === 'delete'" @click='deleteData'>Удалить</button>
                <button type='button' class='delete' v-if="modalType === 'edit'" @click='saveData'>Сохранить</button>
                <div v-if="modalType === 'delete todo'">
                  <button type='button' class='delete delete-from-favorite' @click='removeFromFavorites'>Убрать из избранного</button>
                  <button type='button' class='delete' @click='deleteTodo'>Удалить из всех списков</button>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'

export default {
  name: 'Modal',
  data () {
    return {}
  },
  computed: {
    ...mapState('modal', ['modalInfo', 'modalType'])
  },
  methods: {
    deleteData () {
      store.dispatch('todoGroup/deleteTodoGroup', this.modalInfo).then(() => {
        store.dispatch('modal/SET_SHOW_MODAL', false)
      })
    },
    saveData () {
      store.dispatch('todoGroup/updateTodoGroup', this.modalInfo).then(() => {
        store.dispatch('modal/SET_SHOW_MODAL', false)
      })
    },
    deleteTodo () {
      store.dispatch('todo/deleteTodo', this.modalInfo).then(() => {
        store.dispatch('modal/SET_SHOW_MODAL', false)
      })
    },
    removeFromFavorites () {
      const index = this.modalInfo.todo_group.indexOf(this.modalInfo._id)
      this.modalInfo.todo_group.splice(index, 1)
      this.modalInfo.in_favorites = false
      store.dispatch('todo/updateTodo', this.modalInfo).then(() => {
        store.dispatch('modal/SET_SHOW_MODAL', false)
      })
    },
    focusInput () {
      this.$refs.editName.focus()
    }
  },
  mounted () {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this.$emit('close')
      }
    })
    if (this.$refs.editName) {
      this.focusInput()
    }
  }
}
</script>
