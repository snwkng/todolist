<template>
 <div class="todo">
   <div class="todo-header">
     <h1>{{activeGroup.group_name}}</h1>
   </div>
   <ul class="todo-list">
     <li class="todo-list__item">
       <input type="checkbox" class="item-checkbox" />
       <div class="item-content">
         <div class="item-content__main">
            <div class="item-content__main-name">Test todo</div>
         <div class="item-content__main-option"></div>
         </div>
         <div class="item-content__other">18 ferbuary</div>
       </div>
     </li>
     <li class="todo-list__item">
       <input type="checkbox" class="item-checkbox" />
       <div class="item-content">
         <div class="item-content__main">
            <div class="item-content__main-name">Test todo</div>
         <div class="item-content__main-option"></div>
         </div>
         <div class="item-content__other">18 ferbuary</div>
       </div>
     </li>
   </ul>
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
    ...mapActions('todo', ['GET_TODOS', 'GET_TODO'])
  },
  created () {
    this.GET_TODOS()
  },
  mounted () {
    this.GET_TODO('6033c134def4ad3bb4052901')
  }
}
</script>
