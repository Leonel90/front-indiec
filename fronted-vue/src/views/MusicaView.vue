<template>
  <div>
    <ProtectedNavbar />
    <!-- Modal Crear Canción -->
    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Canciones</h1>
          <div id="app">
            <button @click="showCreateModal = true">Crear Canción</button>
            <MyModal :isVisible="showCreateModal" @close="showCreateModal = false">
              <form @submit.prevent="handleCreate">
                <h2>Crear Canción</h2>
                <div class="form-group">
                  <label for="nombre">Nombre de la Canción:</label>
                  <input type="text" v-model="formData.songName" required />
                </div>
                <div class="form-group">
                  <label for="artista">Nombre del Artista:</label>
                  <input type="text" v-model="formData.artistName" required />
                </div>
                <div class="form-group">
                  <label for="album">Álbum:</label>
                  <input type="text" v-model="formData.album" required />
                </div>
                <div class="form-group">
                  <label for="url">URL:</label>
                  <input type="url" v-model="formData.url" required />
                </div>
  <!-- Parte añadida para subir la imagen -->
                <div class="form-group1" v-if="!imagePreview">
              <label for="imagen" class="upload-label">
                <i class="bx bx-check"></i> Subir Imagen
              </label>
              <input type="file" id="imagen" @change="handleFileUpload" accept="image/*" required hidden />
            </div>
            <div v-if="imagePreview" class="image-preview">
              <img :src="imagePreview" alt="Vista previa de la imagen" />
            </div>

                <div class="button-container">
                  <button type="submit">Guardar</button>
                </div>
              </form>
            </MyModal>
          </div>
        </div>
      </div>
    <!-- Carpetas-->
      <div class="pdf">
      <div>PDF</div>
     </div>
     <div class="excel"> 
      <div>EXCEL</div>
     </div>
        <!-- Barra de busqueda  -->
        <div class="buscar">
      <div>Buscar</div>
     </div>

      <!-- Tabla de Canciones -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th><div class="cell">#</div></th>
              <th><div class="cell">Foto</div></th>
              <th><div class="cell">Nombre de la Canción</div></th>
              <th><div class="cell">Nombre del Artista</div></th>
              <th><div class="cell">Álbum</div></th>
              <th><div class="cell">URL</div></th>
              <th><div class="cell">Acciones</div></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(song, index) in songs" :key="index">
              <td><div class="cell">{{ index + 1 }}</div></td>
              <td><div class="cell"><img :src="song.photo" alt="Foto" class="song-photo" /></div></td>
              <td><div class="cell">{{ song.songName }}</div></td>
              <td><div class="cell">{{ song.artistName }}</div></td>
              <td><div class="cell">{{ song.album }}</div></td>
              <td><div class="cell"><a :href="song.url" target="_blank">Link</a></div></td>
              <td>
                <button class="btn edit-btn" @click="editSong(song)">Editar</button>
                <button class="btn delete-btn" @click="deleteSong(index)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal Editar Canción -->
      <MyModal :isVisible="showEditModal" @close="showEditModal = false">
        <form @submit.prevent="handleUpdate">
          <h2>Editar Canción</h2>
          <div class="form-group">
            <label for="nombre">Nombre de la Canción:</label>
            <input type="text" v-model="formData.songName" required />
          </div>
          <div class="form-group">
            <label for="artista">Nombre del Artista:</label>
            <input type="text" v-model="formData.artistName" required />
          </div>
          <div class="form-group">
            <label for="album">Álbum:</label>
            <input type="text" v-model="formData.album" required />
          </div>
          <div class="form-group">
            <label for="url">URL:</label>
            <input type="url" v-model="formData.url" required />
          </div>
         <!-- Parte añadida para editar la imagen -->
         <div class="form-group1" v-if="!editImagePreview">
                  <label for="edit-imagen" class="upload-label">
                    <i class="bx bx-check"></i> Cambiar Imagen
                  </label>
                  <input type="file" id="edit-imagen" @change="handleEditFileUpload" accept="image/*" required hidden />
                </div>
                <div v-if="editImagePreview" class="image-preview">
                  <img :src="editImagePreview" alt="Vista previa de la imagen" />
                </div>
          <div class="button-container">
            <button type="submit">Guardar</button>
          </div>
        </form>
      </MyModal>
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
      showCreateModal: false,
      showEditModal: false,
      formData: {
        songName: "",
        artistName: "",
        album: "",
        url: "",
        photo: "", // Aquí se almacenará la URL de la imagen seleccionada
      },
      songs: [
        {
          photo: "path/to/photo1.png",
          songName: "Song 1",
          artistName: "Artist 1",
          album: "Album 1",
          url: "http://example.com/song1",
        },
        {
          photo: "path/to/photo2.png",
          songName: "Song 2",
          artistName: "Artist 2",
          album: "Album 2",
          url: "http://example.com/song2",
        },
      ],
      editingIndex: null,
    };
  },
  methods: {
    handleCreate() {
      const newSong = { ...this.formData };
      this.songs.push(newSong);
      this.showCreateModal = false;
      this.resetFormData();
      Swal.fire({
        title: "¡Canción creada!",
        text: "La nueva canción ha sido creada con éxito.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    editSong(song) {
      this.editingIndex = this.songs.indexOf(song);
      this.formData = { ...song };
      this.showEditModal = true;
    },
    handleUpdate() {
      if (this.editingIndex !== null) {
        this.$set(this.songs, this.editingIndex, { ...this.formData });
        this.showEditModal = false;
        this.resetFormData();
        Swal.fire({
          title: "¡Canción actualizada!",
          text: "La canción ha sido actualizada con éxito.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    },
    deleteSong(index) {
      this.songs.splice(index, 1);
      Swal.fire({
        title: "¡Canción eliminada!",
        text: "La canción ha sido eliminada con éxito.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    resetFormData() {
      this.formData = {
        songName: "",
        artistName: "",
        album: "",
        url: "",
        photo: "", // Limpiamos la URL de la foto después de cada operación
      };
      this.editingIndex = null;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Aquí puedes procesar el archivo, por ejemplo, subirlo a un servidor o mostrarlo en la interfaz.
        this.formData.photo = URL.createObjectURL(file); // Usamos createObjectURL para una visualización rápida.
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para el contenedor principal */
#capa-padre {
  background-color: aliceblue;
  border-radius: 20px;
  text-align: center;
  margin: 5px auto;
  padding: 10px;
  box-shadow: 5px 2px 3px 1px rgba(0, 0, 0, 0.164);
  font-family: "Times New Roman", Times, serif;
  font-size: 16px;
  color: black;
}

/* Estilos para el formulario y botones */
#app {
  text-align: center;
  margin-top: 10px;
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #0aa5a9;
  color: white;
  border-radius: 13px;
  text-transform: capitalize;
}

button:hover {
  background-color: #067b80;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
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

/* Estilos para la tabla */
.table-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 100px;/*con esto  puedo   bajar mas la tabla   para que haya espacio  entre el modal de crear y el cuadro */

}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f8f8f8;
  border-radius: 5px;
}

.cell {
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
  display: inline-block;
}

.song-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 2px;
}

.edit-btn {
  background-color: #ffc107;
  color: #fff;
}

.delete-btn {
  background-color: #dc3545;
  color: #fff;
}

.btn:hover {
  opacity: 0.8;
}

/* Estilos para el modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; 
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

@media (max-width: 450px) {
  .modal-content {
    width: 90%;
  }
}

.pdf {
  background-color: #dc3545;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 2px;
  width: 60px;
  position: relative;
  top: 120px;
}
.excel {
  background-color: #28a745;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 2px;
  width: 60px;
  position: relative;
  top: 86px;
  left:70px;
}


.buscar{
  background-color: #ffffff;
  color:black;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  padding: 5px 10px;
  position:relative;
  border: none;
  left:500px;
  top:50px;
  cursor: pointer;
  margin: 0 2px;
  width:380px;
  border-radius:10px;
  text-align: center;
}

/* Estilos de la vista previa de la imagen */
.image-preview {
  margin: 80px;
}
.image-preview img {
  max-width: 100%;
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


</style>
