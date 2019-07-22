import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/fractions',
      name: 'fractions',
      component: () => import(/* webpackChunkName: "fractions" */ './views/Fractions.vue')
    },
    {
      path: '/websocket',
      name: 'websocket',
      component: () => import(/* webpackChunkName: "websocket" */ './views/Websocket.vue')
    }
  ]
})
