<template>
  <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  <v-icon name="info" />
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  <span>Вы дейтсвительно хотите удалить <strong class="text-danger">{{modalInfo.group_name}}</strong></span>
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button type="button" class="cancel" @click="$emit('close')">Отмена</button>
                  <button type="button" class="delete" @click="deleteData">Удалить</button>
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
    return {

    }
  },
  computed: {
    ...mapState('modal', ['modalInfo'])
  },
  methods: {
    deleteData () {
      store.dispatch('todoGroup/DELETE_TODO_GROUP', this.modalInfo).then(() => {
        store.dispatch('modal/SET_SHOW_MODAL', false)
      })
    }
  },
  mounted () {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this.$emit('close')
      }
    })
  }
}
</script>
