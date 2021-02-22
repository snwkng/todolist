<template>
  <b-col md="3" class="todo-left-navigation">
    <ul class="list-group">
      <li>
        <b-icon-bookmark />
        <span class="list-group__item">Входящие</span>
      </li>
      <li>
        <b-icon-bookmark-plus />
        <span class="list-group__item">Входящие для команды</span>
      </li>
      <li>
        <b-icon-calendar />
        <span class="list-group__item">Сегодня</span>
      </li>
      <li>
        <b-icon-calendar4-event />
        <span class="list-group__item">Предстоящие</span>
      </li>
      <li>
        <b-icon-exclamation-diamond />
        <span class="list-group__item">Дела</span>
      </li>
    </ul>
  </b-col>
</template>

<script>
// import store from '@/store'
// import { mapState, mapAction } from 'vuex'
export default {
  name: 'LeftNavigation'
}
</script>
