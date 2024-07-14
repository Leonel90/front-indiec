<template>
  <div class="container">
    <div class="left">
      <div class="header">
        <h2 class="animation a1">Bienvenido</h2>
      </div>
      <div class="form">
        <input v-model="email" type="email" class="form-field animation a3" placeholder="Correo Electronico">
        <input v-model="password" type="password" class="form-field animation a4" placeholder="Contraseña">
        <button @click="login" class="animation a6">Ingresar</button>
        <p class="animation a5">Si no tienes cuenta?<router-link to="/registro"><strong> Registrate </strong></router-link></p>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          email: this.email,
          password: this.password
        });
        localStorage.setItem('token', response.data.token); // Guarda el token en el almacenamiento local
        Swal.fire({
          icon: 'success',
          title: '¡Ingreso exitoso!',
          text: 'Redirigiendo al dashboard...',
          timer: 2000,
          showConfirmButton: false
        });
        setTimeout(() => {
          this.$router.push('/dashboard'); // Redirige a la vista protegida
        }, 2000);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: error.response.data.message || 'Ha ocurrido un error, por favor intenta nuevamente.',
        });
      }
    }
  }
};
</script>
<style>
* {
  box-sizing: border-box;
}
@import url("https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap");

body {
  font-family: "Rubik", sans-serif;
}

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
  background-image: url('/public/img/registro.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

}

.header > h2 {
  color: #4f46a5;  
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
  padding: 0 16px;
  border: 2px solid #656ED3;
  border-radius: 20px;
  font-family: "Rubik", sans-serif;
  outline: 0;
  transition: 0.2s;
  margin: 13px;
}

.form-field:focus {
  border-color: #0f7ef1;
}

.form > button {
  padding: 12px 10px;
  border: 0;
  background: linear-gradient(to right, #656ED3 0%, #AFB3FF 100%);
  border-radius: 15px;
  margin: 5px;
  color: #fff;
  letter-spacing: 1px;
  font-family: "Rubik", sans-serif;
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