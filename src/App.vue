<template>
  <div id="app" class="app">
    <Navbar />
    <div class="layout">
      <LeftNavigation />
      <router-view/>
    </div>
    <modal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import store from '@/store'
import Navbar from '@/components/Navbar'
import LeftNavigation from '@/components/LeftNavigation'
import Modal from './components/Modal.vue'
export default {
  components: {
    Navbar,
    LeftNavigation,
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
