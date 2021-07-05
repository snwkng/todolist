<template>
<div class="editor-date-picker" v-on-clickaway="closeDatePicker">
  <div class="editor-date-picker__item">
    <v-icon class="editor-date-picker__item-icon" name="sun"></v-icon>
    <span  class="editor-date-picker__item-text">Сегодня</span>
  </div>
  <div class="editor-date-picker__item">
    <v-icon class="editor-date-picker__item-icon" name="clock"></v-icon>
    <span  class="editor-date-picker__item-text">Завтра</span>
  </div>
  <vc-calendar :attributes='attributes' :value="date" :min-date="new Date()" />
</div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import moment from 'moment'
export default {
  mixins: [clickaway],
  name: 'TodoEditorDatePicker',
  data () {
    return {
      date: moment(),
      attributes: [
        {
          key: 'today',
          highlight: 'pink',
          dates: new Date()
        }
      ]
    }
  },
  methods: {
    closeDatePicker () {
      this.$emit('closeDatePicker')
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-date-picker {
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, .14), 0 3px 3px -2px rgba(0, 0, 0, .12), 0 1px 8px 0 rgba(0, 0, 0, .20);
  background-color: white;
  height: 300px;
  left: 10px;
  position: absolute;
  top: 90%;
  width: 250px;

  &__item {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    padding: 10px 15px;

    &:hover {
      background-color: #f7f7f7;
    }

    &-icon {
      height: 17px;
      width: 17px;
    }

    &-text {
      margin-left: 10px;
    }
  }
}
</style>
