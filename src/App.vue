<template>
  <div id="app">
    <Navbar />
    <div class="layout">
      <LeftNavigation />
      <router-view/>
    </div>
    <modal />
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
  }
}
</script>

<style lang="scss">
  @import "assets/styles/base.scss";
</style>
