<template>
  <ProtectedNavbar />
  <div class="content">
    <div class="header">
      <div id="inicio">
        <h1>Perfil</h1>
      </div>

      <div id="capa-padre">
        <h1>Artista</h1>
        <hr />

        <div id="app">
          <form @submit.prevent="handleSubmit">
            <!-- Subir Imagen -->
            <div class="form-group1" v-if="!imagePreview">
              <label for="imagen" class="upload-label">
                <i class="bx bx-image-add"></i>
              </label>
              <input
                type="file"
                id="imagen"
                @change="handleFileUpload"
                accept="image/*"
                required
                hidden
              />
            </div>
            <div v-if="imagePreview" class="image-preview">
              <img :src="imagePreview" alt="Vista previa de la imagen" />
            </div>
            <!-- Campos del Perfil (Deshabilitados) -->
            <div class="form-group">
              <label for="nombre"></label>
              <input
                type="text"
                id="nombre"
                v-model="formData.nombre"
                disabled
                placeholder="Nombre"
              />
            </div>
            <div class="form-group">
              <label for="apellido"></label>
              <input
                type="text"
                id="apellido"
                v-model="formData.apellido"
                disabled
                placeholder="Apellido"
              />
            </div>
            <div class="form-group">
              <label for="email"></label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                disabled
                placeholder="Correo "
              />
            </div>
            <div class="form-group">
              <label for="telefono1"></label>
              <input
                type="tel"
                id="telefono1"
                v-model="formData.telefono1"
                disabled
                placeholder="Celular "
              />
            </div>
            <div class="barra">
              <button class="boton" type="button" @click="showModal = true">
                <i class="bx bx-edit"></i> Editar
              </button>
            </div>
          </form>

          <!-- Modal para Editar Perfil -->
          <MyModal :isVisible="showModal" @close="showModal = false">
            <form @submit.prevent="handleEditSubmit">
              <div class="barra2">
                <h2>Editar Perfil</h2>
              </div>
              <!-- Parte añadida para editar la imagen -->
              <div class="form-group1" v-if="!editImagePreview">
                <label for="edit-imagen" class="upload-label">
                  <i class="bx bx-check"></i> Cambiar Imagen
                </label>
                <input
                  type="file"
                  id="edit-imagen"
                  @change="handleEditFileUpload"
                  accept="image/*"
                  required
                  hidden
                />
              </div>
              <div v-if="editImagePreview" class="image-preview">
                <img :src="editImagePreview" alt="Vista previa de la imagen" />
              </div>
              <div class="form-group2">
                <label for="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  v-model="editData.nombre"
                  required
                  placeholder="Nombre"
                />
              </div>
              <div class="form-group2">
                <label for="apellido">Apellido:</label>
                <input
                  type="text"
                  id="apellido"
                  v-model="editData.apellido"
                  required
                  placeholder="Apellido"
                />
              </div>
              <div class="form-group2">
                <label for="email">Correo :</label>
                <input
                  type="email"
                  id="email"
                  v-model="editData.email"
                  required
                  placeholder="Correo "
                />
              </div>
              <div class="form-group2">
                <label for="telefono1"> Celular :</label>
                <input
                  type="tel"
                  id="telefono1"
                  v-model="editData.telefono1"
                  required
                  placeholder="Celular "
                />
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
import Swal from "sweetalert2";

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
        apellido: "",
        email: "",
        telefono1: "",
        imagen: null,
      },
      editData: {
        nombre: "",
        apellido: "",
        email: "",
        telefono1: "",
        imagen: null,
      },
      imagePreview: "",
      editImagePreview: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.imagen = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleEditFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.editData.imagen = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.editImagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleSubmit() {
      console.log("Datos del perfil enviados:", this.formData);
      Swal.fire({
        title: "¡Perfil Actualizado!",
        text: "Los datos del perfil se han actualizado exitosamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        this.showModal = false;
        // Actualizar vista previa de la imagen del perfil
        if (this.editImagePreview) {
          this.imagePreview = this.editImagePreview;
        }
        // Actualizar los datos del perfil
        Object.assign(this.formData, this.editData);
        this.formData.imagen = this.editData.imagen;
        // Limpiar los datos de edición
        this.editData = {
          nombre: "",
          apellido: "",
          email: "",
          telefono1: "",
          imagen: null,
        };
      });
    },
    handleEditSubmit() {
      this.handleSubmit();
    },
  },
  watch: {
    showModal(val) {
      if (val) {
        Object.assign(this.editData, this.formData);
        this.editImagePreview = this.imagePreview;
      }
    },
  },
};
</script>

<style scoped>
#inicio {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/public/img/fondo.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  text-align: center;
  padding: 5px;
  border-radius: 20px;
}

/* Estilos del contenedor principal */
#capa-padre {
  background-color: aliceblue;
  border-radius: 20px;
  text-align: center;
  margin: 5px auto;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  color: black;
  width: 80%;
  max-width: 550px;
  height: auto;
  position: relative;
  top: 50px;
  max-height: 1000px;
}
/* Estilos del contenedor del formulario */
#app {
  text-align: center;
  margin: 5px;
}
/* Estilos de la vista previa de la imagen */
.image-preview {
  margin: 10px;
}
.image-preview img {
  max-width: 30%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
}
/* Estilos del botón para subir imagen */
.form-group1 {
  display: inline-block;
  background-color: #067b80;
  color: white;
  padding: 6px;
  border-radius: 13px;
  cursor: pointer;
  text-align: center;
}

/* Estilos del botón de editar */
.barra {
  background-color: #20252a;
  border-radius: 5px;

  display: flex;
  align-items: center; 
  justify-content: center; 
  position: relative;
  margin: 5px auto; 
}

.boton {
  background-color: #f59c1a;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  padding: 8px; 
  display: flex;
  align-items: center; 
  margin:5px;
}

.boton i {
  margin-right: 8px; /* Espacio entre el ícono y el texto */
}

/* Estilos de los campos del formulario */
.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
  right: 90px;
  top: 10px;
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
  border-radius: 5px;
  background-color: #495057;
  color: white;
  text-align: center;
}
.form-group input::placeholder {
  color: white;
}

/* Estilos del modal */
.barra2 {
  background-color: #ffffff;
  border-radius: 5px;
  width: 250px;
  height: 40px;
  position: relative;
  left: 130px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  background-color: rgba(240, 240, 240, 0.9);
  margin-bottom: 20px;
}
.modal-content h2 {
  margin-bottom: 15px;
  color: #070707;
}
.form-group2 {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
  right: 80px;
}
.form-group2 label {
  flex: 1;
  margin-right: 10px;
  text-align: right;
  font-weight: bold;
  margin-right: 10px;
  width: 200px;
  display: inline-block;
  color: #40c1c1;
}
.form-group2 input {
  flex: 2;
  border-radius: 5px;
  background-color: #495057;
  color: white;
  text-align: center;
  width: calc(130% - 150px);
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  position: relative;
  top: 10px;
}
.form-group2 input::placeholder {
  color: white;
}
.button-container {
  text-align: center;
  margin-top: 20px;
  background-color: #20252a;
  width: 340px;
  border-radius: 5px;
  position: relative;
  left: 90px;
}
button[type="submit"] {
  font-size: 14px;
  color: white;
  background-color: #067b80;
  border: none;
  border-radius: 9px;
  cursor: pointer;
  padding: 10px 10px;
}
button[type="submit"]:hover {
  background-color: #40c1c1;
}
</style>
