<template>
 <div class="todo">

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
