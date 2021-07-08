<template>
  <div class='editor-date-picker' v-on-clickaway='closeDatePicker'>
    <div class='editor-date-picker-list'>
      <div class='editor-date-picker-list__item' @click="chooseDate('today')">
        <v-icon class='editor-date-picker-list__item-icon' name='sun'></v-icon>
        <span class='editor-date-picker-list__item-text'>Сегодня</span>
      </div>
      <div class='editor-date-picker-list__item' @click="chooseDate('tomorrow')">
        <v-icon class='editor-date-picker-list__item-icon' name='clock'></v-icon>
        <span class='editor-date-picker-list__item-text'>Завтра</span>
      </div>
    </div>
    <vc-date-picker
      class='editor-date-picker-list__item-calendar'
      :attributes='attributes'
      v-model='date'
      is-expanded
      :min-date='new Date()'
    />
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import moment from 'moment'

export default {
  mixins: [clickaway],
  name: 'TodoEditorDatePicker',
  props: {
    todoDate: {
      type: String,
      default: () => {
        return moment().format('MMMM Do YYYY, h:mm:ss a')
      }
    }
  },
  data () {
    return {
      attributes: [
        {
          key: 'today',
          highlight: 'pink',
          dates: new Date()
        }
      ]
    }
  },
  computed: {
    date: {
      get () {
        return moment().format('MMMM Do YYYY, h:mm:ss a')
      },
      set (value) {
        this.$emit('todoDate', moment(value).format('MMMM Do YYYY, h:mm:ss a'))
      }
    }
  },
  methods: {
    closeDatePicker () {
      this.$emit('closeDatePicker')
    },
    chooseDate (how) {
      if (how === 'today') {
        this.date = moment().format()
      }
      if (how === 'tomorrow') {
        this.date = moment().add(1, 'days').format()
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.editor-date-picker {
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
  0 3px 3px -2px rgba(0, 0, 0, 0.12), 0 1px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  height: auto;
  left: 10px;
  position: absolute;
  top: 90%;
  //transition: all 0.2s ease-out;
  width: 250px;
  z-index: 2001;

  &-list {
    border-bottom: 1px solid #c2c2c2;

    &__item {
      align-items: center;
      cursor: pointer;
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

      &-calendar {
        border: none;
        border-bottom: 1px solid #c2c2c2;
        border-radius: 0;
      }
    }
  }
}
</style>
