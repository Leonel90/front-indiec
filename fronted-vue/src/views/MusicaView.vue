<template>
  <div>
    <ProtectedNavbar />
    <!-- Modal Crear Canción -->
    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Canción</h1>
          <div id="app">
            <button @click="showCreateModal = true">Crear Canción</button>
            <MyModal :isVisible="showCreateModal" @close="showCreateModal = false">
              <!-- Formulario para crear una canción -->
              <form v-if="!isEditing" @submit.prevent="handleCreate">
                <h2>Crear Canción</h2>
                <div class="form-group custom-form-group">
                  <label for="imagen" class="upload-label custom-upload-label">
                    <i class="bx bx-check"></i> Subir Imagen
                  </label>
                  <input type="file" id="imagen" class="custom-upload-input" @change="handleFileUpload"
                    accept="image/*" />
                </div>
                <div v-if="imagePreview" class="image-preview custom-image-preview">
                  <img :src="imagePreview" alt="Vista previa de la imagen" class="custom-preview-img" />
                </div>
                <div class="form-group">
                  <label for="songName">Nombre de la Canción:</label>
                  <input type="text" v-model="formData.songName" required placeholder="Ingrese nombre" />
                </div>
                <div class="form-group">
                  <label for="artistName">Nombre del Artista:</label>
                  <input type="text" v-model="formData.artistName" required placeholder="Ingrese nombre del artista" />
                </div>
                <div class="form-group">
                  <label for="platform">Album:</label>
                  <div class="container">
                    <select v-model="formData.platform" class="custom-select">
                      <option value="1">Album 1</option>
                      <option value="2">Album 2</option>
                      <option value="3">Album 3</option>
                    </select>
                  </div>
                </div>
                <div class="button-container">
                  <button type="submit">Guardar</button>
                </div>
              </form>

              <!-- Formulario para editar una canción -->
              <form v-else @submit.prevent="handleEdit">
                <h2>Editar Canción</h2>
                <div class="form-group custom-form-group">
                  <label for="edit-imagen" class="upload-label custom-upload-label">
                    <i class="bx bx-check"></i> Cambiar Imagen
                  </label>
                  <input type="file" id="edit-imagen" class="custom-upload-input" @change="handleEditFileUpload"
                    accept="image/*" />
                </div>
                <div v-if="editImagePreview" class="image-preview custom-image-preview">
                  <img :src="editImagePreview" alt="Vista previa de la imagen" class="custom-preview-img" />
                </div>
                <div class="form-group">
                  <label for="songName">Nombre de la Canción:</label>
                  <input type="text" v-model="formData.songName" required placeholder="Ingrese nombre" />
                </div>
                <div class="form-group">
                  <label for="artistName">Nombre del Artista:</label>
                  <input type="text" v-model="formData.artistName" required placeholder="Ingrese nombre del artista" />
                </div>
                <div class="form-group">
                  <label for="platform">Album:</label>
                  <div class="container">
                    <select v-model="formData.platform" class="custom-select">
                      <option value="1">Album 1</option>
                      <option value="2">Album 2</option>
                      <option value="3">Album 3</option>
                    </select>
                  </div>
                </div>
                <div class="button-container">
                  <button type="submit">Guardar Cambios</button>
                </div>
              </form>
            </MyModal>
          </div>
        </div>
      </div>

      <!-- Botones para exportar y buscar -->
      <div class="button-container">
        <button class="pdf">PDF</button>
        <button class="excel">EXCEL</button>
        <input type="text" placeholder="Buscar . . ." class="buscar" v-model="searchQuery" />
      </div>

      <!-- Tabla de Canciones -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <div class="cell">#</div>
              </th>
              <th>
                <div class="cell">Foto</div>
              </th>
              <th>
                <div class="cell">Nombre de la Canción</div>
              </th>
              <th>
                <div class="cell">Nombre del Artista</div>
              </th>
              <th>
                <div class="cell">Album</div>
              </th>
              <th>
                <div class="cell">Estado</div>
              </th>
              <th>
                <div class="cell">Acciones</div>
              </th>
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
                <div class="cell">{{ song.songName }}</div>
              </td>
              <td>
                <div class="cell">{{ song.artistName }}</div>
              </td>
              <td>
                <div class="cell">{{ getGroupLabel(song.platform) }}</div>
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
                  <button class="btn delete-btn" v-if="song.status === 'Activo'" @click="deleteSong(song)">
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
        songName: "",
        artistName: "",
        platform: "1", // Valor por defecto para "Grupo"
        status: "Activo",
        photo: "", // Agregado para almacenar la URL de la foto
      },
      songs: [
        {
          photo: "https://i.pinimg.com/736x/48/22/bf/4822bf54ee339f9e3842192de95a906e.jpg",
          songName: "Canción 1",
          artistName: "Artista 1",
          platform: "1", // Valor por defecto para "Grupo"
          status: "Activo",
        },
        {
          photo: "https://i.pinimg.com/736x/48/22/bf/4822bf54ee339f9e3842192de95a906e.jpg",
          songName: "Canción 2",
          artistName: "Artista 2",
          platform: "2",
          status: "Activo",
        },
        // Otros datos de canciones...
      ],
      imagePreview: null,
      editImagePreview: null,
      isEditing: false,
      editingSongIndex: null,
    };
  },
  computed: {
    filteredSongs() {
      const query = this.searchQuery.toLowerCase();
      return this.songs.filter(song =>
        song.songName.toLowerCase().includes(query) ||
        song.artistName.toLowerCase().includes(query) ||
        this.getGroupLabel(song.platform).toLowerCase().includes(query)
      );
    },
  },
  methods: {
    handleCreate() {
      this.songs.push({
        ...this.formData,
        photo: this.imagePreview,
        platform: this.formData.platform // Usa el ID del álbum directamente
      });
      this.showCreateModal = false;
      this.resetForm();
    },
    startEditing(song) {
      this.formData = { ...song };
      this.editImagePreview = song.photo;
      this.isEditing = true;
      this.showCreateModal = true;
      this.editingSongIndex = this.songs.indexOf(song); // Guarda el índice de la canción editada
    },
    handleEdit() {
      if (this.editingSongIndex !== null) {
        this.songs[this.editingSongIndex] = {
          ...this.formData,
          photo: this.editImagePreview,
          platform: this.formData.platform // Usa el ID del álbum directamente
        };
        this.isEditing = false;
        this.showCreateModal = false;
        this.resetForm();
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.previewImage(file, 'imagePreview');
    },
    handleEditFileUpload(event) {
      const file = event.target.files[0];
      this.previewImage(file, 'editImagePreview');
    },
    previewImage(file, previewKey) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this[previewKey] = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    deleteSong(song) {
      song.status = 'Eliminado';
    },
    restoreSong(song) {
      song.status = 'Activo';
    },
    getGroupLabel(platform) {
      const groups = {
        "1": "Album 1",
        "2": "Album 2",
        "3": "Album 3"
      };
      return groups[platform] || "Desconocido";
    },

    getSongStatusClass(status) {
      return {
        'status-active': status === 'Activo',
        'status-deleted': status === 'Eliminado',
      };
    },
    viewSongDetails(song) {
      Swal.fire({
        title: `Detalles de la Canción: ${song.songName}`,
        html: `
          <p><strong>Artista:</strong> ${song.artistName}</p>
          <p><strong>Album:</strong> ${this.getGroupLabel(song.platform)}</p>
          <p><strong>Estado:</strong> ${song.status}</p>
          <img src="${song.photo}" alt="Foto" class="swal-image">
        `,
        imageUrl: song.photo,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Foto de la Canción',
      });
    },
    resetForm() {
      this.formData = {
        songName: "",
        artistName: "",
        platform: "1",
        status: "Activo",
        photo: "",
      };
      this.imagePreview = null;
      this.editImagePreview = null;
      this.isEditing = false;
      this.editingSongIndex = null;
    }
  }
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
  border-radius: 12px;
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
  /*con esto  puedo   bajar mas la tabla   para que haya espacio  entre el modal de crear y el cuadro */
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

.buscar {}
</style>
