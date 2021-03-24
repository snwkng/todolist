<template>
  <div class="sidebar-list__custom-icon" @click.stop="showMenu = !showMenu">
    <v-icon class="icon sidebar-icon__custom" name="more-horizontal"></v-icon>
    <div class="help-menu" v-if="showMenu">
      <ul class="help-menu__list">
        <li class="help-menu__list-item">
          <v-icon class="help-menu__list-item-icon" name="edit-3" />
          <span class="help-menu__list-item-text">редактировать группу</span>
        </li>
        <li class="help-menu__list-item">
          <v-icon class="help-menu__list-item-icon" name="trash" />
          <span class="help-menu__list-item-text" @click="callDeleteModal"
            >удалить группу
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import store from '@/store'

export default {
  name: 'HelpMenu',
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    callDeleteModal () {
      store.dispatch('modal/SET_SHOW_MODAL', true)
    }
  }
}
</script>
