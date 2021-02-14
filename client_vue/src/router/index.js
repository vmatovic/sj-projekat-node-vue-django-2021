import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '@/views/SignUp.vue'
import LogIn from '@/views/LogIn.vue'
import Profilna from '@/views/ProfilnaStranica.vue'
import Narudzbine from '@/views/NarudzbineStranica.vue'
import Materijali from '@/views/Materijali.vue'
import Dugmici from '@/views/Dugmici.vue'
import Namestaj from '@/views/MaterijaliNamestaj.vue'
import JedanMaterijal from '@/views/JedanMaterijal.vue'
import KupovinaMaterijala from '@/views/KupovinaMaterijala.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profil',
    name: 'ProfilnaStranica',
    component: Profilna
  },
  {
    path: '/narudzbine',
    name: 'NarudzbineStranica',
    component: Narudzbine
  },
  {
    path: '/materijali',
    name: 'Materijali',
    component: Materijali
  },
  {
    path: '/materijal/:id',
    name: 'JedanMaterijal',
    component: JedanMaterijal
  },
  {
    path: '/materijal/kupovina/:id',
    name: 'KupovinaMaterijala',
    component: KupovinaMaterijala
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
