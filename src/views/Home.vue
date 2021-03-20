<template>
<main class="main" id="main">
  <Todo />
</main>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todo.vue'

export default {
  name: 'Home',
  components: {
    Todo
  }
}
</script>
