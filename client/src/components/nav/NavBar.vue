   
<template>
  <div id="nav">
    <router-link class="links" v-for="link in links" :key="link.id" :to="link.path">{{link.name}}</router-link>
    <Logout v-if="authorized" />
  </div>
</template>


<script>
import { defineComponent } from 'vue'
import Logout from '@/components/auth/Logout.vue';
export default defineComponent({
 name:'nav-bar',
 components: {
   Logout
 },
 props: {
   links: {
     type: [Object],
     required: true, 
   },
   authorized: {
     type: Boolean,
     required: true,
   }
 }
})
</script>
<style scoped lang="scss">

.links {
  font-size: 30px;
  margin: 0 10px;
}



</style>
