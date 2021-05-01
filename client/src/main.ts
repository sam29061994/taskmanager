import { createApp } from 'vue';
import {createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';
import Signin from './views/Signin.vue'
import NotFound from './views/NotFound.vue'
import Home from './views/Home.vue'

const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
       path:'/', redirect:'/todo',

    },
    {
      path: '/auth',
      name: 'Signin',
      component: Signin,
    },
    {
      path: '/todo',
      name:'Home',
      component:Home,  
      meta: {
        requiresAuth: true
      }
  
    },
    {
      path: '/about',
      name: 'About',
      meta: {
        requiresAuth: true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path:'/:notFound(.*)',
      name: 'NotFound',
      component:NotFound,
    }

  ]
})

router.beforeEach(function(to, from, next) {
 if (to.meta.requiresAuth && !localStorage.getItem('access_token')) {
   next({name:'Signin'})
 } else next();
});

createApp(App).directive('focus',{
  mounted(el) {
    el.focus()
  }
}).use(router).mount('#app');
