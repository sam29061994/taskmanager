<template>
  <Login :routeTo="'todo'"/>
</template>


<script>
import { defineComponent } from 'vue'
import Login from '@/components/auth/Login';

export default defineComponent({
 name:'signin',
 components:{
   Login,
 }
})
</script>
