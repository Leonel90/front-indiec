import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InformacionView from '@/views/InformacionView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginViev from '@/views/LoginViev.vue'
import RegistreView from '@/views/RegistreView.vue'

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
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true } // Indica que esta ruta requiere autenticación
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
