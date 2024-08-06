<template>
  <div class="container">
    <div class="right"></div>
    <div class="left">
      <div class="header">
        <h4 class="animation a1">
          ¡Por favor, complete el formulario para el Administrador!
        </h4>
        <br />
      </div>
      <div class="form">
        <input
          type="file"
          class="form-field animation a3 file-field"
          @change="onImageChange"
          accept="image/*"
          required
        />
        <input
          v-model="apellido"
          type="text"
          class="form-field animation a3"
          placeholder="Ingrese Apellido"
          required
        />
        <input
          v-model="nombre"
          type="text"
          class="form-field animation a3"
          placeholder="Ingrese Nombre"
          required
        />
        <input
          v-model="email"
          type="email"
          class="form-field animation a3"
          placeholder="example@yavirac.edu.ec"
          @input="validateEmail"
          required
        />
        <input
          v-model="celular"
          type="text"
          class="form-field animation a3"
          placeholder="Ingrese Celular"
          @input="validateCelular"
          required
        />
        <input
          v-model="contrasena"
          type="password"
          class="form-field animation a4"
          placeholder="Contraseña"
          required
        />

        <select v-model="genero_fk" class="form-field animation a3 select-field" required>
          <option value="" disabled selected>Seleccione Género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>

        <button @click="register" class="animation a6">Registrate</button>
        <p class="animation a5">
          ¿Sí tengo una cuenta?
          <router-link to="/login"><strong>Inicia Sesión</strong></router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      image: null,
      nombre: "",
      apellido: "",
      email: "",
      celular: "",
      contrasena: "",
      genero_fk: "",
      emailError: "",
      celularError: "",
    };
  },
  methods: {
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@yavirac\.edu\.ec$/;
      this.emailError = emailPattern.test(this.email)
        ? ""
        : "El email debe terminar en @yavirac.edu.ec";
    },
    validateCelular() {
      const celularPattern = /^\d{0,10}$/;
      this.celularError =
        celularPattern.test(this.celular) && this.celular.length === 10
          ? ""
          : "El celular debe contener solo números y tener exactamente 10 dígitos";
    },
    onImageChange(event) {
      this.image = event.target.files[0];
    },
    async register() {
      this.validateEmail();
      this.validateCelular();

      if (this.emailError || this.celularError) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: this.emailError || this.celularError,
        });
        return;
      }

      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("nombre", this.nombre);
      formData.append("apellido", this.apellido);
      formData.append("email", this.email);
      formData.append("celular", this.celular);
      formData.append("contrasena", this.contrasena);
      formData.append("genero_fk", this.genero_fk);

      try {
        const response = await axios.post("http://localhost:3000/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Redirigiendo al inicio de sesión...",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Ha ocurrido un error, por favor intenta nuevamente.";
        Swal.fire({
          icon: "error",
          title: "Error al registrarse",
          text: errorMessage,
        });
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Rubik:400,500&display=swap");

.container {
  display: flex;
  height: 100vh;
}

.left {
  align-items: center; /* Centrar horizontalmente */
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
  background-image: url("/public/img/login.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.header > h4 {
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

.select-field {
  height: 50px;
  padding: 10px;
  background-color: #fff;
  color: #838383c0;
  border: 2px solid #656ed3;
  border-radius: 15px;
  outline: 0;
  transition: 0.2s;
  margin: 13px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%23666' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 10px 5px;
}

.select-field:focus {
  border-color: #0f7ef1;
}

.file-field {
  height: 50px;
  padding: 10px;
  background-color: #fff;
  color: #000;
  border: 2px solid #656ed3;
  border-radius: 15px;
  outline: 0;
  transition: 0.2s;
  margin: 13px;
}

.file-field:focus {
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

.form > button:hover {
  background: linear-gradient(to right, #4453fd 0%, #afb3ff 100%);
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
