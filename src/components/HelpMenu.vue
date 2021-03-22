<template>
  <div class="sidebar-list__custom-icon" @click.stop="showMenu = !showMenu">
    <v-icon class="icon sidebar-icon__custom" name="more-horizontal"></v-icon>
     <div class="help-menu" v-if="showMenu">
       <ul class="help-menu__list">
         <li class="help-menu__list-item">удалить проект</li>
       </ul>
  </div>
  </div>
</template>
<script>
export default {
  name: 'HelpMenu',
  data () {
    return {
      showMenu: false
    }
  }
}
</script>
