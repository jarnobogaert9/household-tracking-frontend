import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Types from '../views/Types.vue'
import Users from '../views/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/types',
    name: 'Types',
    component: Types
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
