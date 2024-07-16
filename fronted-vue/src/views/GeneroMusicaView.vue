<template>
  <ProtectedNavbar />
  <div class="content">
    <div class="header">
      <div id="capa-padre">
        <h1>Genero musical</h1>
        <div id="app">
          <button @click="showModal = true">Crear genero</button>
          <MyModal :isVisible="showModal" @close="showModal = false">
            <form @submit.prevent="handleSubmit">
              <h2>Crear Genero</h2>
              <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" id="name" v-model="formData.nombre" required />
              </div>
              <div class="button-container">
                <button type="submit">Guardar</button>
              </div>
            </form>
          </MyModal>

          
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";
import MyModal from "../components/Modal.vue";
import Swal from 'sweetalert2';

export default {
  components: {
    ProtectedNavbar,
    MyModal,
  },
  data() {
    return {
      showModal: false,
      formData: {
        nombre: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      // Maneja el envío del formulario aquí
      console.log("Formulario enviado:", this.formData);
      Swal.fire({
        title: '¡Formulario enviado!',
        text: 'Descripción: ' + this.formData.nombre,
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Cierra el modal después de guardar los datos
        this.showModal = false;
        // Limpiar el formulario
        this.formData = {
          nombre: "",
        };
      });
    },
  },
};
</script>

<style scoped>
#capa-padre {
  background-color: aliceblue;
  border-radius: 20px;
  text-align: center;

  margin: 5px auto;
  padding: 10px;
  box-shadow: 5px 2px 3px 1px rgba(0, 0, 0, 0.26);
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  color: black;
}
#app {
  text-align: center;
  margin-top: 10px;
}
button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #0AA5A9;
  color: white;
  border-radius: 13px;
  text-transform:capitalize;
}
button:hover{
  background-color: #067b80;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
}
.form-group label {
  flex: 1;
  margin-right: 10px;
  font-weight: bold;
  text-align: right;
}
.form-group input {
  flex: 2;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
button[type="submit"] {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 11px;
  cursor: pointer;
}
button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
