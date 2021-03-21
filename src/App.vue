<template>
  <div id="app">
    <Navbar />
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <div class="layout">
      <LeftNavigation />
      <router-view/>
    </div>
    <modal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
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
      showModal: false
    }
  }
}
</script>

<style lang="scss">
  @import "assets/styles/base.scss";
</style>
