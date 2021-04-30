<template>
  <button @click="logout" type="submit" class="btn-submit logout-btn">Logout</button>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
 name:'logout',
 methods: {
    logout() {
      localStorage.removeItem('access_token');
      this.$router.push({name:"Landing"})
    }
 }
})
</script>

  