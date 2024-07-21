<template>
  <div>
    <ProtectedNavbar />
    
    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Disquera</h1>
          <div id="app">
            <button @click="showCreateModal = true">Crear Disquera</button>
            <MyModal :isVisible="showCreateModal" @close="showCreateModal = false">
              <form v-if="!isEditing" @submit.prevent="handleCreate">
                <h2>Crear Disquera</h2>
                
                <div class="form-group custom-form-group">
                  <label for="imagen" class="upload-label custom-upload-label">
                    <i class="bx bx-check"></i> Subir Imagen
                  </label>
                  <input
                    type="file"
                    id="imagen"
                    class="custom-upload-input"
                    @change="handleFileUpload"
                    accept="image/*"
                  />
                </div>
                
                <div v-if="imagePreview" class="image-preview custom-image-preview">
                  <img
                    :src="imagePreview"
                    alt="Vista previa de la imagen"
                    class="custom-preview-img"
                  />
                </div>
                <div class="form-group">
                  <label for="recordlabelName">Disquera:</label>
                  <input type="text" v-model="formData.recordlabelName" required />
                </div>
                <div class="form-group">
                  <label for="descriptiontName">Descripcion:</label>
                  <input type="text" v-model="formData.descriptiontName" required />
                </div>
                <div class="form-group">
                  <label for="platform">Plataforma:</label>
                  <input type="text" v-model="formData.platform" required />
                </div>
                <div class="form-group">
                  <label for="url">URL:</label>
                  <input type="url" v-model="formData.url" required />
                </div>
                <div class="button-container">
                  <button type="submit">Guardar</button>
                </div>
              </form>

              
              <form v-else @submit.prevent="handleEdit">
                <h2>Editar Disquera</h2>
                
                <div class="form-group custom-form-group">
                  <label for="edit-imagen" class="upload-label custom-upload-label">
                    <i class="bx bx-check"></i> Cambiar Imagen
                  </label>
                  <input
                    type="file"
                    id="edit-imagen"
                    class="custom-upload-input"
                    @change="handleEditFileUpload"
                    accept="image/*"
                  />
                </div>
                
                <div v-if="editImagePreview" class="image-preview custom-image-preview">
                  <img
                    :src="editImagePreview"
                    alt="Vista previa de la imagen"
                    class="custom-preview-img"
                  />
                </div>
                <div class="form-group">
                  <label for="recordlabelName">Nombre de la Disquera:</label>
                  <input type="text" v-model="formData.recordlabelName" required />
                </div>
                <div class="form-group">
                  <label for="descriptiontName">Descripcion:</label>
                  <input type="text" v-model="formData.descriptiontName" required />
                </div>
                <div class="form-group">
                  <label for="platform">Plataforma:</label>
                  <input type="text" v-model="formData.platform" required />
                </div>
                <div class="form-group">
                  <label for="url">URL:</label>
                  <input type="url" v-model="formData.url" required />
                </div>
                <div class="button-container">
                  <button type="submit">Guardar Cambios</button>
                </div>
              </form>
            </MyModal>
          </div>
        </div>
      </div>

      
      <div class="button-container">
        <button class="pdf">PDF</button>
        <button class="excel">EXCEL</button>
        <input
          type="text"
          placeholder="Buscar . . ."
          class="buscar"
          v-model="searchQuery"
        />
      </div>

      
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th><div class="cell">#</div></th>
              <th><div class="cell">Foto</div></th>
              <th><div class="cell">Nombre de la Disquera</div></th>
              <th><div class="cell">Descripcion</div></th>
              <th><div class="cell">Plataforma</div></th>
              <th><div class="cell">URL</div></th>
              <th><div class="cell">Estado</div></th>
              <th><div class="cell">Acciones</div></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(song, index) in filteredSongs" :key="index">
              <td>
                <div class="cell">{{ index + 1 }}</div>
              </td>
              <td>
                <div class="cell">
                  <img :src="song.photo" alt="Foto" class="song-photo" />
                </div>
              </td>
              <td>
                <div class="cell">{{ song.recordlabelName }}</div>
              </td>
              <td>
                <div class="cell">{{ song.descriptiontName }}</div>
              </td>
              <td>
                <div class="cell">{{ song.platform }}</div>
              </td>
              <td>
                <div class="cell">
                  <a :href="song.url" target="_blank">{{ song.url }}</a>
                </div>
              </td>
              <td>
                <span :class="getSongStatusClass(song.status)">
                  {{ song.status }}
                </span>
              </td>
              <td>
                <div class="button-group">
                  <button class="btn view-btn" @click="viewSongDetails(song)">
                    <i class="bx bx-show"></i>
                  </button>
                  <button class="btn edit-btn" @click="startEditing(song)">
                    <i class="bx bx-edit"></i>
                  </button>
                  <button
                    class="btn delete-btn"
                    v-if="song.status === 'Activo'"
                    @click="deleteSong(song)"
                  >
                    <i class="bx bx-trash"></i>
                  </button>
                  <button class="btn restore-btn" v-else @click="restoreSong(song)">
                    <i class="bx bx-undo"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
      showCreateModal: false,
      searchQuery: "",
      formData: {
        recordlabelName: "",
        descriptiontName: "",
        platform: "",
        url: "",
        status: "Activo",
        photo: "", 
      },
      songs: [
        {
          photo: "path/to/photo1.png",
          recordlabelName: "Disquera 1",
          descriptiontName: "Descripcion 1",
          platform: "Plataforma 1",
          url: "https://youtube.com/song1",
          status: "Activo",
        },
        {
          photo: "path/to/photo2.png",
          recordlabelName: "Disquera 2",
          descriptiontName: "Descripcion 2",
          platform: "Plataforma 2",
          url: "https://youtube.com/song2",
          status: "Eliminado",
        },
        {
          photo: "path/to/photo3.png",
          recordlabelName: "Disquera 3",
          descriptiontName: "Descripcion 3",
          platform: "Plataforma 3",
          url: "https://youtube.com/song3",
          status: "Activo",
        },
      ],
      isEditing: false,
      editIndex: null,
      imagePreview: null, 
      editImagePreview: null, 
    };
  },
  computed: {
    filteredSongs() {
      const query = this.searchQuery.toLowerCase();
      return this.songs.filter(
        (song) =>
          song.recordlabelName.toLowerCase().includes(query) ||
          song.descriptiontName.toLowerCase().includes(query) ||
          song.platform.toLowerCase().includes(query) ||
          song.url.toLowerCase().includes(query) ||
          song.status.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      
      this.imagePreview = URL.createObjectURL(file);

      
      this.formData.photo = this.imagePreview;
    },
    handleEditFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      
      this.editImagePreview = URL.createObjectURL(file);

     
      this.formData.photo = this.editImagePreview;
    },
    handleCreate() {
      const newSong = { ...this.formData };
      this.songs.push(newSong);
      this.showCreateModal = false;
      this.resetFormData();
      this.imagePreview = null; 
      Swal.fire("¡Éxito!", "La Discografia ha sido creada exitosamente.", "success");
    },
    startEditing(song) {
      this.isEditing = true;
      this.formData = { ...song };
      this.editIndex = this.songs.indexOf(song);
      this.showCreateModal = true;
    },
    handleEdit() {
      if (this.editIndex !== null) {
        this.songs.splice(this.editIndex, 1, { ...this.formData });
        this.showCreateModal = false;
        this.isEditing = false;
        this.resetFormData();
        this.editImagePreview = null; 
        Swal.fire("¡Éxito!", "La Discografia ha sido actualizada exitosamente.", "success");
      }
    },
    resetFormData() {
      this.formData = {
        recordlabelName: "",
        descriptiontName: "",
        platform: "",
        url: "",
        status: "Activo",
        photo: "", 
      };
    },
    deleteSong(song) {
      song.status = "Eliminado";
      Swal.fire("¡Éxito!", "La Discografia ha sido eliminada exitosamente.", "success");
    },
    restoreSong(song) {
      song.status = "Activo";
      Swal.fire("¡Éxito!", "La Discografia ha sido restaurada exitosamente.", "success");
    },
    viewSongDetails(song) {
      
      Swal.fire({
        title: `Detalles de ${song.recordlabelName}`,
        html: `
          <div>
            <img src="${song.photo}" alt="Foto de ${song.recordlabelName}" style="max-width: 100%; height: auto;">
          </div>
          <p><strong>Nombre de la Disquera:</strong> ${song.recordlabelName}</p>
          <p><strong>Descripcion:</strong> ${song.descriptiontName}</p>
          <p><strong>Plataforma:</strong> ${song.platform}</p>
          <p><strong>URL:</strong> <a href="${song.url}" target="_blank">${song.url}</a></p>
          <p><strong>Estado:</strong> ${song.status}</p>
        `,
        confirmButtonText: "Cerrar",
        customClass: {
          popup: "custom-swal-popup",
          content: "custom-swal-content",
          closeButton: "custom-swal-close",
          confirmButton: "custom-swal-confirm",
        },
      });
    },
    getSongStatusClass(status) {
      return {
        "status-active": status === "Activo",
        "status-inactive": status === "Eliminado",
      };
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
  box-shadow: 5px 2px 3px 1px rgba(0, 0, 0, 0.164);
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
  background-color: aliceblue;
  padding: 10px;
  border-radius:12px;
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

.table-container {
  padding: 20px;
  background-color: aliceblue;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  margin-top: 20px; 
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f8f8;
  border-radius: 5px;
}

.cell {
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
}
.cell:hover {
  background-color: white;
}

.song-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.status-active,
.status-inactive {
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
}

.status-active {
  background-color: #28a745;
}

.status-inactive {
  background-color: #dc3545;
}

.button-group {
  display: flex;
  justify-content: space-around;
}

.btn {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 2px;
}

.view-btn {
  background-color: #6c757d;
  color: #fff;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.137);
}

.edit-btn {
  background-color: #ffc107;
  color: #fff;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.137);
}

.delete-btn {
  background-color: #dc3545;
  color: #fff;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.137);
}

.restore-btn {
  background-color: #17a2b8;
  color: #fff;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.137);
}

.pdf,
.excel,
.buscar {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 2px;
}

.pdf {
  background-color: #dc3545;
  color: #fff;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.137);
}

.excel {
  background-color: #28a745;
  color: #fff;
  margin-left: 10px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.137);
}

.buscar {
  background-color: #ffffff;
  color: black;
  box-shadow: 5px 2px 3px 1px rgba(0, 0, 0, 0.164);
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
  width: 380px;
  border-radius: 10px;
  text-align: center;
}

.custom-form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.custom-upload-label {
  display: flex;
  align-items: center;
  background-color: #3c8dbc;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.custom-upload-input {
  display: none;
}

.custom-image-preview {
  margin-top: 10px;
}

.custom-preview-img {
  max-width: 80%;
  max-height: 50px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.song-photo {
  max-width: 70px;
  max-height: 50px;
  border-radius: 4px;
  object-fit: cover;
}

</style>
