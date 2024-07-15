import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InformacionView from '@/views/InformacionView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginViev from '@/views/LoginViev.vue'
import RegistreView from '@/views/RegistreView.vue'
import GeneroMusicaView from '@/views/GeneroMusicaView.vue'
import PerfilArtistaView from '@/views/PerfilArtistaView.vue'
import GrupoMusicalView from '@/views/GrupoMusicalView.vue'
import AlbumView from '@/views/AlbumView.vue'
import DisquerazView from '@/views/DisquerazView.vue'
import ManegerView from '@/views/ManegerView.vue'
import EventosView from '@/views/EventosView.vue'
import MusicaView from '@/views/MusicaView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/registro',
    name: 'registre',
    component: RegistreView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginViev
  },
  {
    path: '/informacion',
    name: 'informacion',
    component: InformacionView
  },
  // todo dentro del admin vista del inicio
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },// perfil artista
  {
    path: '/perfil',
    name: 'perfil artista',
    component: PerfilArtistaView,
    meta: { requiresAuth: true }
  }
  ,//grupo musical
  {
    path: '/grupo',
    name: 'grupo musical',
    component: GrupoMusicalView,
    meta: { requiresAuth: true }
  }
  ,
  // genero musical
  {
    path: '/genero-musical',
    name: 'genero-musical',
    component: GeneroMusicaView,
    meta: { requiresAuth: true }
  }
  ,  // Album

  {
    path: '/album',
    name: 'album',
    component: AlbumView,
    meta: { requiresAuth: true }
  }
  ,// Maneger
  {
    path: '/maneger',
    name: 'maneger',
    component: ManegerView,
    meta: { requiresAuth: true }
  },//disqueraz
  {
    path: '/disqueraz',
    name: 'disqueraz',
    component: DisquerazView,
    meta: { requiresAuth: true }
  }
  ,//Eventos
  {
    path: '/eventos',
    name: 'eventos',
    component: EventosView,
    meta: { requiresAuth: true }
  }
  ,//musica
  {
    path: '/musica',
    name: 'musica',
    component: MusicaView,
    meta: { requiresAuth: true }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes

})

// Añade un guardia de navegación para proteger las rutas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('token');

  if (requiresAuth && !token) {
    next('/login'); 
  } else {
    next(); 
  }
});

export default router;
