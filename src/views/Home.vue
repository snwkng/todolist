<template>
  <div>
    <Navbar />
    <div class='layout'>
      <LeftNavigation />
      <main class='main' id='main'>
        <Todo />
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todo.vue'
import Navbar from '@/components/Navbar'
import LeftNavigation from '@/components/LeftNavigation'

export default {
  name: 'Home',
  components: {
    Navbar,
    LeftNavigation,
    Todo
  }
}
</script>
