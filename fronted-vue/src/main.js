import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/js/bootstrap';

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

// Crear la aplicación Vue
const app = createApp(App);

// Usar las bibliotecas necesarias
app.use(store);
app.use(router);

// Configurar la aplicación para no mostrar el tip de producción
app.config.productionTip = false;

// Montar la aplicación
app.mount('#app');
