import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '@/views/SignUp.vue'
import LogIn from '@/views/LogIn.vue'
import Message from '@/views/Message.vue'
import NewMessage from '@/views/NewMessage.vue'
import Materijali from '@/views/Materijali.vue'
import Dugmici from '@/views/Dugmici.vue'
import Namestaj from '@/views/MaterijaliNamestaj.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/materijali',
    name: 'Materijali',
    component: Materijali
  },
  {
    path: '/dugmici',
    name: 'Dugmici',
    component: Dugmici
  },
  {
    path: '/namestaj',
    name: 'Namestaj',
    component: Namestaj
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/edit',
    name: 'newMessage',
    component: NewMessage
  },
  {
    path: '/message/:id',
    name: 'message',
    component: Message
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
