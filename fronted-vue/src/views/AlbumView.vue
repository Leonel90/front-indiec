<template>
  <ProtectedNavbar />
  <div class="content">
    <div class="header">
      <div id="capa-padre">
        <h1>Albumes</h1>
        <div id="app">
          <button @click="showModal = true">Crear Album</button>
          <MyModal :isVisible="showModal" @close="showModal = false">
            <form @submit.prevent="handleSubmit">
              <h2>Crear Album</h2>
              <div class="form-group">
                <label for="fotografia" style=" background-color:#067b80; color:white; padding:6px; border-radius:13px;"> <i class="bx bx-check"></i>  Subir Foto</label>
                <input type="file" id="fotografia" @change="handleFileUpload" accept="image/*" required hidden  />
              </div>
              
              <div v-if="imagePreview" class="image-preview">
                <img :src="imagePreview" alt="Vista previa de la imagen" />
              </div>
              <div class="form-group">
                <label for="name">Album: </label>
                <input type="text" id="name" v-model="formData.album" required placeholder="nombre del album"/>
              </div>
              <div class="form-group">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="formData.nombre" required placeholder="nombre del artista"/>
              </div>

              <div class="button-container">
                <button type="submit">Guardar</button>
              </div>
            </form>
          </MyModal>
        </div>
      </div>
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
        fotografia: "",
        album: "",
        nombre: ""
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.fotografia = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleSubmit() {
      // Aquí podrías manejar la carga de la imagen, por ejemplo:
      // const formDataToSubmit = new FormData();
      // formDataToSubmit.append('fotografia', this.formData.fotografia);
      // Enviar `formDataToSubmit` a tu servidor

      console.log("Formulario enviado con la fotografía:", this.formData.album);
      Swal.fire({
        title: '¡Formulario enviado!',
        text: 'Album cargado exitosamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        this.showModal = false;
        this.formData.album = null;
        this.imagePreview = null;
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
  font-size: 16px;
  color: black;
}
#app {
  text-align: center;
  margin-top: 10px;
}
.image-preview {
  margin: 10px;
}
.image-preview img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 5px 2px 3px 1px rgba(0, 0, 0, 0.26);

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
