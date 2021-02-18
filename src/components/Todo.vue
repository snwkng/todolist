<template>
  <b-col md="8">
    <div class="todo-title">
      <h1>Сегодня</h1>
    </div>
    <div class="todo-content">
      <div class="todo-content-title">
        <span>Дом</span>
      </div>
      <ul class="list-group">
        <li>
          <div class="todo-item">
            <div class="d-flex">
              <b-form-radio
                v-model="done"
                name="done-radio"
                value="true" />
              <span>Some do</span>
            </div>
            <div class="todo-item__settings">
            </div>
          </div>
        </li>
        <li>Itemasdas asdasda</li>
        <li>Itemasdas asdasdas</li>
        <li>Itemasdas asdasdas</li>
        <li>Itemasdasasdas da</li>
      </ul>
    </div>
  </b-col>
</template>

<script>
export default {
  name: 'Todo',
  data () {
    return {
      done: false
    }
  }
}
</script>
