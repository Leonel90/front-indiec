import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios'; // Importar Axios
import PrimeVue from 'primevue/config';
import Calendar from 'primevue/calendar';
import 'primevue/resources/themes/saga-blue/theme.css'; // Theme
import 'primevue/resources/primevue.min.css';           // Core CSS
import 'primeicons/primeicons.css';                     // Icons
import 'primeflex/primeflex.css';                       // PrimeFlex

import { registerLicense } from '@syncfusion/ej2-base'

registerLicense("Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCdkx3Q3xbf1x0ZFRMZV5bQHBPIiBoS35RckVkWHZfcnFRQ2BaVUd0")

// Crear la aplicación Vue
const app = createApp(App);

// Configuración base de Axios
axios.defaults.baseURL = 'http://localhost:9000/'; // Cambia esto a la URL de tu API

// Configurar Axios para incluir el token en todas las solicitudes
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globales
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Redirige a login si el token no es válido
      router.push('/');
    }
    return Promise.reject(error);
  }
);

// Usar las bibliotecas necesarias
app.component('Calendar', Calendar);
app.use(PrimeVue);
app.use(store);
app.use(router);

// Configurar la aplicación para no mostrar el tip de producción
app.config.productionTip = false;

// Montar la aplicación
app.mount('#app');
