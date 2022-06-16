import Vue from 'vue'
import VueRouter from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import Question from '@/views/question/Question.vue'
import Introduce from '@/views/introduce/Introduce.vue'
import NotFound from '@/components/NotFound.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Success from '@/views/Success.vue'
// midlewares

Vue.use(VueRouter)
import checkAuth from '@/middleware/auth.js';

const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }, {
    path: '/',
    component: DefaultLayout,
    beforeEnter: checkAuth,
    children: [
      {
        path: '',
        component: Introduce,
      },
      {
        path: '/questions',
        component: Question,
      },
      {
        path: '/success',
        component: Success,
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
