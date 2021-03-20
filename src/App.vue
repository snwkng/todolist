<template>
  <div id="app">
    <Navbar />
    <div class="layout">
      <LeftNavigation />
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import LeftNavigation from '@/components/LeftNavigation'
export default {
  components: {
    Navbar,
    LeftNavigation
  }
}
</script>

<style lang="scss">
  @import "assets/styles/base.scss";
</style>
