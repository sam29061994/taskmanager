<template>
  <NavBar />
  <div class="home">
    <header>
      <img alt="Vue logo" src="../assets/logo.png" class="logo" />
      <h1>Task Manager</h1>
    </header>
    <TodoList />
    <Logout />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoList from '@/components/todo/TodoList.vue';
import NavBar from '@/components/nav/NavBar.vue';
import Logout from '@/components/auth/Logout.vue';

export default defineComponent({
  name: 'Home',
  components: {
    TodoList,
    NavBar,
    Logout,
  },
});
</script>

<style lang="scss">
header {
  text-align: center;
}

.logo {
  height: 100px;
}
</style>
