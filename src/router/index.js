import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import main from '@/components/main'
import playerDemo from '@/components/views/playerDemo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
      meta: {
        keepalive: false
      }
    }, {
      path: '/main',
      name: 'main',
      component: main,
      meta: {
        keepalive: true
      }
    },{
      path: '/playerDemo',
      name: 'playerDemo',
      component: playerDemo,
      meta: {
        keepalive: true
      }
    },
  ]
})
