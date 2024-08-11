<template>
  <div>
    <ProtectedNavbar />

    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Canción</h1>
          <div id="app">
            <button @click="openCreateModal">Crear Canción</button>
            <MyModal :isVisible="showCreateModal" @close="closeModal">
              <!-- Formulario para crear o editar una canción -->
              <form @submit.prevent="isEditing ? handleEdit() : handleCreate()">
                <h2>{{ isEditing ? "Editar Canción" : "Crear Canción" }}</h2>

                <div class="form-group">
                  <label for="imagen">Imagen (URL):</label>
                  <input
                    type="text"
                    id="imagen"
                    v-model="formData.foto_musica"
                    placeholder="URL de la imagen"
                  />
                </div>

                <div v-if="formData.foto_musica" class="image-preview">
                  <img
                    :src="formData.foto_musica"
                    alt="Vista previa de la imagen"
                    class="preview-img"
                  />
                </div>

                <div class="form-group">
                  <label for="nombre_musica">Nombre de la Canción:</label>
                  <input
                    type="text"
                    id="nombre_musica"
                    v-model="formData.nombre_musica"
                    required
                    placeholder="Ingrese nombre"
                  />
                </div>

                <div class="form-group">
                  <label for="nombre_Artista">Nombre del Artista:</label>
                  <input
                    type="text"
                    id="nombre_Artista"
                    v-model="formData.nombre_Artista"
                    required
                    placeholder="Ingrese nombre del artista"
                  />
                </div>

                <div class="form-group">
                  <label for="estado_fk">Estado:</label>
                  <select v-model="formData.estado_fk" required>
                    <option
                      v-for="estado in estados"
                      :key="estado.id_estado_manager"
                      :value="estado.id_estado_manager"
                    >
                      {{ estado.estado }}
                    </option>
                  </select>
                </div>

                <div class="button-container">
                  <button type="submit">
                    {{ isEditing ? "Guardar Cambios" : "Guardar" }}
                  </button>
                </div>
              </form>
            </MyModal>

            <MyModal :isVisible="showViewModal" @close="closeViewModal">
              <!-- Información detallada de la canción -->
              <div v-if="selectedSong">
                <h2>Detalles de la Canción</h2>
                <div class="form-group">
                  <label>Imagen:</label>
                  <img
                    :src="selectedSong.foto_musica"
                    alt="Imagen de la canción"
                    class="preview-img"
                  />
                </div>

                <div class="form-group">
                  <label>Nombre de la Canción:</label>
                  <p>{{ selectedSong.nombre_musica }}</p>
                </div>

                <div class="form-group">
                  <label>Nombre del Artista:</label>
                  <p>{{ selectedSong.nombre_Artista }}</p>
                </div>

                <div class="form-group">
                  <label>Estado:</label>
                  <p>{{ getStatusLabel(selectedSong.estado_fk) }}</p>
                </div>
              </div>
            </MyModal>
          </div>
        </div>
      </div>

      <!-- Botones para exportar y buscar -->
      <div class="button-container">
        <button class="pdf" @click="exportToPDF">PDF</button>
        <button class="excel" @click="exportToExcel">EXCEL</button>
        <input
          type="text"
          placeholder="Buscar . . ."
          class="buscar"
          v-model="searchQuery"
        />
      </div>

      <!-- Tabla de Canciones -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Foto</th>
              <th>Nombre de la Canción</th>
              <th>Nombre del Artista</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(song, index) in filteredSongs" :key="song.id_Musica">
              <td>{{ index + 1 }}</td>
              <td>
                <img :src="song.foto_musica" alt="Foto" class="song-photo" />
              </td>
              <td>{{ song.nombre_musica }}</td>
              <td>{{ song.nombre_Artista }}</td>
              <td>
                <span :class="getStatusClass(song.estado_fk)">
                  {{ getStatusLabel(song.estado_fk) }}
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
                    v-if="song.estado_fk === 1"
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
import instance from "@/pluggins/axios";
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
      showViewModal: false,
      formData: {
        foto_musica: "",
        nombre_musica: "",
        nombre_Artista: "",
        estado_fk: null,
      },
      songs: [],
      estados: [],
      csrfToken: "",
      isEditing: false,
      editSongId: null,
      searchQuery: "",
      selectedSong: null,
    };
  },
  async mounted() {
    try {
      // Obtén el token CSRF del backend
      const response = await instance.get("/");
      this.csrfToken = response.data.csrfToken;
      // Configura el token CSRF en Axios
      instance.defaults.headers["X-CSRF-Token"] = this.csrfToken;
      this.fetchSongs();
      this.fetchEstados();
    } catch (error) {
      console.error("Error al obtener el token CSRF:", error);
    }
  },
  methods: {
    fetchSongs() {
      instance
        .get("/musicas")
        .then((response) => {
          this.songs = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener canciones:", error);
        });
    },
    fetchEstados() {
      instance
        .get("/estadoManager")
        .then((response) => {
          this.estados = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener estados:", error);
        });
    },
    handleCreate() {
      instance
        .post("/musicas", this.formData)
        .then((response) => {
          this.songs.push(response.data);
          this.showCreateModal = false;
          this.resetFormData();
          Swal.fire("¡Éxito!", "La canción ha sido creada exitosamente.", "success");
        })
        .catch((error) => {
          console.error("Error al crear canción:", error);
        });
    },
    handleEdit() {
      instance
        .put(`/musicas/${this.editSongId}`, this.formData)
        .then((response) => {
          const updatedSong = response.data;
          const index = this.songs.findIndex(
            (song) => song.id_Musica === updatedSong.id_Musica
          );
          if (index !== -1) {
            this.songs.splice(index, 1, updatedSong);
          }
          this.showCreateModal = false;
          this.isEditing = false;
          this.resetFormData();
          Swal.fire("¡Éxito!", "La canción ha sido actualizada exitosamente.", "success");
        })
        .catch((error) => {
          console.error("Error al actualizar canción:", error);
        });
    },
    startEditing(song) {
      this.isEditing = true;
      this.editSongId = song.id_Musica;
      this.formData = { ...song };
      this.showCreateModal = true;
    },
    viewSongDetails(song) {
      this.selectedSong = song;
      this.showViewModal = true;
    },
    deleteSong(song) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción cambiará el estado de la canción a 'Eliminado'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          instance
            .put(`/musicas/${song.id_Musica}`, { ...song, estado_fk: 2 })
            .then(() => {
              song.estado_fk = 2;
              Swal.fire("¡Eliminado!", "La canción ha sido eliminada.", "success");
            })
            .catch((error) => {
              console.error("Error al eliminar canción:", error);
            });
        }
      });
    },
    restoreSong(song) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción cambiará el estado de la canción a 'Activo'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, restaurar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          instance
            .put(`/musicas/${song.id_Musica}`, { ...song, estado_fk: 1 })
            .then(() => {
              song.estado_fk = 1;
              Swal.fire("¡Restaurado!", "La canción ha sido restaurada.", "success");
            })
            .catch((error) => {
              console.error("Error al restaurar canción:", error);
            });
        }
      });
    },
    openCreateModal() {
      this.isEditing = false;
      this.resetFormData();
      this.showCreateModal = true;
    },
    closeModal() {
      this.showCreateModal = false;
      this.resetFormData();
    },
    closeViewModal() {
      this.showViewModal = false;
      this.selectedSong = null;
    },
    resetFormData() {
      this.formData = {
        foto_musica: "",
        nombre_musica: "",
        nombre_Artista: "",
        estado_fk: null,
      };
    },
    getStatusClass(estado_fk) {
      return estado_fk === 1 ? "active" : "inactive";
    },
    getStatusLabel(estado_fk) {
      return estado_fk === 1 ? "Activo" : "Eliminado";
    },
    exportToPDF() {
      // Implementar exportación a PDF
    },
    exportToExcel() {
      // Implementar exportación a Excel
    },
  },
  computed: {
    filteredSongs() {
      const query = this.searchQuery.toLowerCase();
      return this.songs.filter(
        (song) =>
          song.nombre_musica.toLowerCase().includes(query) ||
          song.nombre_Artista.toLowerCase().includes(query)
      );
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
  max-width: 30%;
  max-height: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.song-photo {
  max-width: 60px; /* Ancho máximo de la imagen */
  max-height: 70px; /* Altura máxima de la imagen */
  width: auto; /* Ancho automático para mantener la relación de aspecto */
  height: auto; /* Altura automática para mantener la relación de aspecto */
  object-fit: cover; /* Ajusta la imagen al contenedor sin distorsionar */
  border-radius: 4px; 
}

/* styles.css o archivo de estilo del componente */
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.modal-content img.preview-img {
  max-width: 100%;
  height: auto;
}

.modal-content .form-group {
  margin-bottom: 15px;
}


.buscar {
}
</style>
