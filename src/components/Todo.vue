<template>
  <b-col md="9">
    <div class="todo-title">
      <h1>Сегодня</h1>
    </div>
    <div class="todo-content">
      <div class="todo-content-title">
        <font-awesome-icon icon="chevron-down" /><span>Дом</span>
      </div>
      <ul class="list-group">
        <li>
          <div class="todo-item">
            <div class="d-flex todo-item__content">
              <b-form-radio v-model="done" name="done-radio" value="true" />
              <span>Some do</span>
            </div>
            <div class="todo-item__settings">
              <div class="option">
                <font-awesome-icon icon="edit" />
              </div>
              <div class="option">
                <font-awesome-icon icon="trash" />
              </div>
              <div class="option">
                <font-awesome-icon icon="ellipsis-v" />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="todo-item">
            <div class="d-flex todo-item__content">
              <b-form-radio v-model="done" name="done-radio" value="true" />
              <span>Some do</span>
            </div>
            <div class="todo-item__settings">
              <div class="option">
                <font-awesome-icon icon="edit" />
              </div>
              <div class="option">
                <font-awesome-icon icon="trash" />
              </div>
              <div class="option">
                <font-awesome-icon icon="ellipsis-v" />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="todo-item">
            <div class="d-flex todo-item__content">
              <b-form-radio v-model="done" name="done-radio" value="true" />
              <span>Some do</span>
            </div>
            <div class="todo-item__settings">
              <div class="option">
                <font-awesome-icon icon="edit" />
              </div>
              <div class="option">
                <font-awesome-icon icon="trash" />
              </div>
              <div class="option">
                <font-awesome-icon icon="ellipsis-v" />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="todo-item">
            <div class="d-flex todo-item__content">
              <b-form-radio v-model="done" name="done-radio" value="true" />
              <span>Some do</span>
            </div>
            <div class="todo-item__settings">
              <div class="option">
                <font-awesome-icon icon="edit" />
              </div>
              <div class="option">
                <font-awesome-icon icon="trash" />
              </div>
              <div class="option">
                <font-awesome-icon icon="ellipsis-v" />
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="todo-item">
            <div class="d-flex todo-item__content">
              <b-form-radio v-model="done" name="done-radio" value="true" />
              <span>Some do</span>
            </div>
            <div class="todo-item__settings">
              <div class="option">
                <font-awesome-icon icon="edit" />
              </div>
              <div class="option">
                <font-awesome-icon icon="trash" />
              </div>
              <div class="option">
                <font-awesome-icon icon="ellipsis-v" />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </b-col>
</template>

<script>
// import store from '@/store'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Todo',
  data () {
    return {
      done: false
    }
  },
  computed: {
    ...mapState('todo', ['todos'])
  },
  methods: {
    ...mapActions('todo', ['GET_TODOS'])
  },
  created () {
    this.GET_TODOS()
  }
}
</script>
