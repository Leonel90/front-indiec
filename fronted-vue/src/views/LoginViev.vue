<template>
  <div class="container">
    <div class="left">
      <div class="header">
        <h1 class="animation a1">Bienvenido</h1>
        <br>
      </div>
      <div class="form">
        <input
          v-model="email"
          type="email"
          class="form-field animation a3"
          placeholder="example@yavirac.edu.ec"
          required
        />
        <input
          v-model="contrasena"
          type="password"
          class="form-field animation a4"
          placeholder="Contraseña"
        />
        <button @click="login" class="animation a6">Ingresar</button>
        <p class="animation a5">
          Si no tienes cuenta?
          <router-link to="/register"><strong> Registrate </strong></router-link>
        </p>
        <p v-if="error" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import instance from '@/pluggins/axios';

export default {
  
  data() {
    return {
      email: '',
      contrasena: '',
      error: false,
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        // Obtener el token CSRF
        const csrfResponse = await instance.get('/');
        const csrfToken = csrfResponse.data.csrfToken;

        // Enviar la solicitud de login
        const response = await instance.post('/Login', {
          email: this.email,
          contrasena: this.contrasena
        }, {
          headers: {
            'X-CSRF-Token': csrfToken // Incluir el token CSRF en los encabezados
          }
        });

        // Redirigir si la autenticación es exitosa
        this.$router.push(response.data.redirect || '/');
      } catch (error) {
        this.error = true;
        this.errorMessage = error.response.data.message || 'Error en el inicio de sesión.';
      }
    }
  }
}
</script>
<style scoped>

@import url("https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap");


.container {
  display: flex;
  height: 100vh;
}

.left {
  align-items: center;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  animation-name: left;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-delay: 1s;
}

.right {
  flex: 1;
  transition: 1s;
  background-image: url("/public/img/registro.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.header > h1 {
  color: #4f46a5;
text-align: center;
}
.form {
  max-width: 80%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.form > p > a {
  color: #000;
  font-size: 15px;
  text-decoration: none;
}

.form-field {
  height: 30px;
  padding: 20px;
  border: 2px solid #656ed3;
  border-radius: 15px;
  outline: 0;
  transition: 0.2s;
  margin: 13px;
}

.form-field:focus {
  border-color: #0f7ef1;
}

.form > button {
  padding: 10px 10px;
  border: 0;
  background: linear-gradient(to right, #656ed3 0%, #afb3ff 100%);
  border-radius: 15px;
  margin: 5px;
  color: #fff;
  letter-spacing: 1px;
}

.animation {
  animation-name: move;
  animation-duration: 0.4s;
  animation-fill-mode: both;
  animation-delay: 2s;
}

.a1 {
  animation-delay: 2s;
}

.a3 {
  animation-delay: 2.2s;
}

.a4 {
  animation-delay: 2.3s;
}

.a5 {
  animation-delay: 2.4s;
}

.a6 {
  animation-delay: 2.5s;
}

@keyframes move {
  0% {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-40px);
  }

  100% {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}

@keyframes left {
  0% {
    opacity: 0;
    width: 0;
  }

  100% {
    opacity: 1;
    padding: 20px 40px;
    width: 440px;
  }
}
</style>
