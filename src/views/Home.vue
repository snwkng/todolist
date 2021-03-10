<template>
<main class="main">
  <LeftNavigation />
  <Todo />
</main>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todo.vue'
import LeftNavigation from '@/components/LeftNavigation'

export default {
  name: 'Home',
  components: {
    LeftNavigation,
    Todo
  }
}
</script>
