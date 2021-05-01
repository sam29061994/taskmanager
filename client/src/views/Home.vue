<template>
  
  <div class="home">
    <TodoList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoList from '@/components/todo/TodoList.vue';


export default defineComponent({
  name: 'Home',
  components: {
    TodoList,
  },
});
</script>
