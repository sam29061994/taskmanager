import { createApp } from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';
import Landing from './views/Landing.vue'
import Home from './views/Home.vue'

const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
      path: '/',
      name: 'Landing',
      component: Landing,
    },
    {
      path: '/todo',
      name:'Home',
      component:Home,  
  
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },

  ]
})

router.beforeEach(function(to, from, next) {
 if (to.name === 'Home' || to.name === 'About' && !localStorage.getItem('access_token')) {
   next({name:'Landing'})
 }
 if (to.name === 'Landing' && localStorage.getItem('access_token')) {
   next({name:'Home'})
 }
});

createApp(App).use(router).mount('#app');
