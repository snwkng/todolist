<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "assets/styles/base.scss";
</style>
<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>
