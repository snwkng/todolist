<template>
  <transition name='modal'>
    <div class='modal-mask'>
      <div class='modal-wrapper'>
        <div class='modal-container'>

          <div class='modal-header'>
            <slot name='header'>
              <div v-if="modalType === 'delete'">
                <v-icon name='info' />
              </div>
              <div class='modal-header__title' v-if="modalType === 'edit'">
                <h3>Редактировать проект</h3>
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
            </slot>
          </div>

          <div class='modal-footer'>
            <slot name='footer'>
              <div>
                <button type='button' class='cancel' @click="$emit('close')">Отмена</button>
                <button type='button' class='delete' v-if="modalType === 'delete'" @click='deleteData'>Удалить</button>
                <button type='button' class='delete' v-if="modalType === 'edit'" @click='saveData'>Сохранить</button>
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
      store.dispatch('todoGroup/DELETE_TODO_GROUP', this.modalInfo).then(() => {
        store.dispatch('modal/SET_SHOW_MODAL', false)
      })
    },
    saveData () {
      store.dispatch('todoGroup/UPDATE_TODO_GROUP', this.modalInfo).then(() => {
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
