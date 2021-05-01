<template>
  <div class="app-wrapper">
    <NavBar :links="links" :authorized="authorized" />
    <Header />
    <router-view />
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/nav/NavBar.vue';
import Header from '@/layouts/Header.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavBar,
    Header,
  },
  data() {
    return {
      links: [
        {
          id: '1',
          path: '/todo',
          name: 'Home',
        },
        {
          id: '2',
          path: '/about',
          name: 'About',
        },
      ],
    };
  },
  computed:{
    authorized() {
      return !!localStorage.getItem('access_token');
    }
  }
});
</script>


<style lang="scss">
* {
  box-sizing: border-box;
}

.app-wrapper {
  max-width: 500px;
  margin: 0 auto;
  position: relative;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  


  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 20px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
