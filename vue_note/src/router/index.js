import Vue from 'vue'
import Router from 'vue-router'
import Toolbar from '@/components/Toolbar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Toolbar',
      component: Toolbar
    }
  ]
})
