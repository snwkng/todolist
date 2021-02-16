<template>
  <b-col md="3" class="todo-left-navigation">
      <ul class="list-group">
        <li>
          <b-icon-bookmark />
          Входящие
        </li>
        <li>
          <b-icon-bookmark-plus />
          Входящие для команды
        </li>
        <li>
          <b-icon-calendar />
          Сегодня
        </li>
        <li>
          <b-icon-calendar4-event />
          Предстоящие
        </li>
        <li>
          <b-icon-exclamation-diamond />
          Дела
        </li>
      </ul>
  </b-col>
</template>

<script>
export default {
  name: 'LeftNavigation'

}
</script>
