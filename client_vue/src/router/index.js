import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '@/views/SignUp.vue'
import LogIn from '@/views/LogIn.vue'
import UserStranica from '@/views/UserStranica.vue'
import Profilna from '@/views/ProfilnaStranica.vue'
import Narudzbine from '@/views/NarudzbineStranica.vue'
import Materijali from '@/views/Materijali.vue'
import Dugmici from '@/views/Dugmici.vue'
import Namestaj from '@/views/MaterijaliNamestaj.vue'
import JedanMaterijal from '@/views/JedanMaterijal.vue'
import JednoDugme from '@/views/JednoDugme.vue'
import JedanMebl from '@/views/JedanMebl.vue'
import KupovinaMaterijala from '@/views/KupovinaMaterijala.vue'
import KupovinaDugmeta from '@/views/KupovinaDugmeta.vue'
import KupovinaMebla from '@/views/KupovinaMebla.vue'
import NijePronadjeno from '@/views/NijePronadjeno.vue'

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
    path: '/korisnici',
    name: 'UserStranica',
    component: UserStranica
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
    path: '/dugme/:id',
    name: 'JednoDugme',
    component: JednoDugme
  },
  {
    path: '/namestaj/:id',
    name: 'JedanMebl',
    component: JedanMebl
  },
  {
    path: '/materijal/kupovina/:id',
    name: 'KupovinaMaterijala',
    component: KupovinaMaterijala
  },
  {
    path: '/dugme/kupovina/:id',
    name: 'KupovinaDugmeta',
    component: KupovinaDugmeta
  },
  {
    path: '/namestaj/kupovina/:id',
    name: 'KupovinaMebla',
    component: KupovinaMebla
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
    path: '*',
    name: 'NijePronadjeno',
    component: NijePronadjeno
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
