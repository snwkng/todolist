<template>
 <div class="todo">
   <div class="todo-header">
     <h1>{{activeGroup.group_name}}</h1>
   </div>
   <div class="todo-list">
   </div>
 </div>
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
    ...mapState('todo', ['todos']),
    ...mapState('todoGroup', ['activeGroup'])
  },
  methods: {
    ...mapActions('todo', ['GET_TODOS'])
  },
  created () {
    this.GET_TODOS()
  }
}
</script>
