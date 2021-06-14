<template>
  <div>
    <slot name='header'>
      <div class='sidebar-list__custom-icon' v-on-clickaway='clickAway' @click.stop='showMenu = !showMenu'>
        <v-icon class='icon sidebar-icon__custom' name='more-horizontal'></v-icon>
      </div>
    </slot>
    <div class='help-menu' v-if='showMenu'>
      <ul class='help-menu__list'>
        <li class='help-menu__list-item' @click='callEditModal'>
          <v-icon class='help-menu__list-item-icon' name='edit-3' />
          <span class='help-menu__list-item-text'>редактировать группу</span>
        </li>
        <li class='help-menu__list-item' @click='callDeleteModal'>
          <v-icon class='help-menu__list-item-icon' name='trash' />
          <span class='help-menu__list-item-text'>удалить группу
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { mixin as clickaway } from 'vue-clickaway'
import store from '@/store'

export default {
  name: 'HelpMenu',
  mixins: [clickaway],
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showMenu: false,
      modalInfo: {}
    }
  },
  methods: {
    clickAway () {
      this.showMenu = false
    },
    callEditModal () {
      this.modalInfo = Object.assign({}, this.info)
      store.dispatch('modal/SET_SHOW_MODAL', {
        showModal: true,
        modalType: 'edit'
      }).then(() => {
        store.dispatch('modal/SET_MODAL_INFO', this.modalInfo)
      })
    },
    callDeleteModal () {
      store.dispatch('modal/SET_SHOW_MODAL', {
        showModal: true,
        modalType: 'delete'
      }).then(() => {
        store.dispatch('modal/SET_MODAL_INFO', this.info)
      })
    }
  }
}
</script>
