<template>
  <div id="app" class="app">
    <router-view />
    <modal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import store from '@/store'
import Modal from './components/Modal.vue'
export default {
  components: {
    Modal
  },
  data () {
    return {
    }
  },
  computed: {
    showModal: {
      get () {
        return store.state.modal.showModal
      },
      set (show) {
        store.dispatch('modal/SET_SHOW_MODAL', show)
      }
    }
  }
}
</script>

<style lang="scss">
  @import "assets/styles/base.scss";
</style>
