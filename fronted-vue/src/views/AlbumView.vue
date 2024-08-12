<template>
  <div>
    <ProtectedNavbar />

    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Álbum</h1>
          <div id="app">
            <button @click="openCreateModal">Crear Álbum</button>
            <MyModal :isVisible="showCreateModal" @close="closeModal">
              <!-- Formulario para crear o editar un álbum -->
              <form @submit.prevent="isEditing ? handleEdit() : handleCreate()">
                <h2>{{ isEditing ? "Editar Álbum" : "Crear Álbum" }}</h2>

                <div class="form-group">
                  <label for="foto_album">Foto del Álbum (URL):</label>
                  <input
                    type="text"
                    id="foto_album"
                    v-model="formData.foto_album"
                    placeholder="URL de la foto del álbum"
                  />
                </div>

                <div v-if="formData.foto_album" class="image-preview">
                  <img
                    :src="formData.foto_album"
                    alt="Vista previa de la foto del álbum"
                    class="preview-img"
                  />
                </div>

                <div class="form-group">
                  <label for="nombre_album">Nombre del Álbum:</label>
                  <input
                    type="text"
                    id="nombre_album"
                    v-model="formData.nombre_album"
                    required
                    placeholder="Ingrese nombre del álbum"
                  />
                </div>

                <div class="form-group">
                  <label for="grupo_musical">Nombre del Grupo:</label>
                  <input
                    type="text"
                    id="grupo_musical"
                    v-model="formData.grupo_musical"
                    required
                    placeholder="Ingrese nombre del grupo"
                  />
                </div>

                <div class="form-group">
                  <label for="integrantes">Número de Integrantes:</label>
                  <input
                    type="text"
                    id="integrantes"
                    v-model="formData.integrantes"
                    required
                    placeholder="Ingrese número de integrantes"
                  />
                </div>

                <div class="form-group">
                  <label for="url">URL del Álbum:</label>
                  <input
                    type="text"
                    id="url"
                    v-model="formData.url"
                    placeholder="Ingrese URL del álbum"
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
              <!-- Información detallada del álbum -->
              <div v-if="selectedAlbum">
                <h2>Detalles del Álbum</h2>
                <div class="form-group">
                  <label>Foto:</label>
                  <img
                    :src="selectedAlbum.foto_album"
                    alt="Foto del álbum"
                    class="preview-img"
                  />
                </div>

                <div class="form-group">
                  <label>Nombre del Álbum:</label>
                  <p>{{ selectedAlbum.nombre_album }}</p>
                </div>

                <div class="form-group">
                  <label>Nombre del Grupo:</label>
                  <p>{{ selectedAlbum.grupo_musical }}</p>
                </div>

                <div class="form-group">
                  <label>Número de Integrantes:</label>
                  <p>{{ selectedAlbum.integrantes }}</p>
                </div>

                <div class="form-group">
                  <label>URL:</label>
                  <p>{{ selectedAlbum.url }}</p>
                </div>

                <div class="form-group">
                  <label>Estado:</label>
                  <p>{{ getStatusLabel(selectedAlbum.estado_fk) }}</p>
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

      <!-- Tabla de Álbumes -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Foto</th>
              <th>Nombre del Álbum</th>
              <th>Nombre del Grupo</th>
              <th>Integrantes</th>
              <th>URL</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(album, index) in filteredAlbums" :key="album.id_Album">
              <td>{{ index + 1 }}</td>
              <td>
                <img :src="album.foto_album" alt="Foto" class="album-photo" />
              </td>
              <td>{{ album.nombre_album }}</td>
              <td>{{ album.grupo_musical }}</td>
              <td>{{ album.integrantes }}</td>
              <td>{{ album.url }}</td>
              <td>
                <span :class="getStatusClass(album.estado_fk)">
                  {{ getStatusLabel(album.estado_fk) }}
                </span>
              </td>
              <td>
                <div class="button-group">
                  <button class="btn view-btn" @click="viewAlbumDetails(album)">
                    <i class="bx bx-show"></i>
                  </button>
                  <button class="btn edit-btn" @click="startEditing(album)">
                    <i class="bx bx-edit"></i>
                  </button>
                  <button
                    class="btn delete-btn"
                    v-if="album.estado_fk === 1"
                    @click="deleteAlbum(album)"
                  >
                    <i class="bx bx-trash"></i>
                  </button>
                  <button class="btn restore-btn" v-else @click="restoreAlbum(album)">
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
        foto_album: "",
        nombre_album: "",
        grupo_musical: "",
        integrantes: "",
        url: "",
        estado_fk: null,
      },
      albums: [],
      estados: [],
      csrfToken: "",
      isEditing: false,
      editAlbumId: null,
      searchQuery: "",
      selectedAlbum: null,
    };
  },
  async mounted() {
    try {
      // Obtén el token CSRF del backend
      const response = await instance.get("/");
      this.csrfToken = response.data.csrfToken;
      // Configura el token CSRF en Axios
      instance.defaults.headers["X-CSRF-Token"] = this.csrfToken;
      this.fetchAlbums();
      this.fetchEstados();
    } catch (error) {
      console.error("Error al obtener el token CSRF:", error);
    }
  },
  methods: {
    fetchAlbums() {
      instance
        .get("/albums")
        .then((response) => {
          this.albums = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener álbumes:", error);
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
        .post("/albums", this.formData)
        .then((response) => {
          this.albums.push(response.data);
          this.showCreateModal = false;
          this.resetFormData();
          Swal.fire("¡Éxito!", "El álbum ha sido creado exitosamente.", "success");
        })
        .catch((error) => {
          console.error("Error al crear álbum:", error);
        });
    },
    handleEdit() {
      instance
        .put(`/albums/${this.editAlbumId}`, this.formData)
        .then((response) => {
          const updatedAlbum = response.data;
          const index = this.albums.findIndex(
            (album) => album.id_Album === updatedAlbum.id_Album
          );
          if (index !== -1) {
            this.albums.splice(index, 1, updatedAlbum);
          }
          this.showCreateModal = false;
          this.isEditing = false;
          this.resetFormData();
          Swal.fire("¡Éxito!", "El álbum ha sido actualizado exitosamente.", "success");
        })
        .catch((error) => {
          console.error("Error al actualizar álbum:", error);
        });
    },
    startEditing(album) {
      this.isEditing = true;
      this.editAlbumId = album.id_Album;
      this.formData = { ...album };
      this.showCreateModal = true;
    },
    viewAlbumDetails(album) {
      this.selectedAlbum = album;
      this.showViewModal = true;
    },
    deleteAlbum(album) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción cambiará el estado del álbum a 'Eliminado'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          instance
            .put(`/albums/${album.id_Album}/eliminar`, { ...album, estado_fk: 2 })
            .then(() => {
              album.estado_fk = 2;
              Swal.fire("¡Eliminado!", "El álbum ha sido eliminado.", "success");
            })
            .catch((error) => {
              console.error("Error al eliminar álbum:", error);
            });
        }
      });
    },
    restoreAlbum(album) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción cambiará el estado del álbum a 'Activo'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, restaurar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          instance
            .put(`/albums/${album.id_Album}/restaurar`, { ...album, estado_fk: 1 })
            .then(() => {
              album.estado_fk = 1;
              Swal.fire("¡Restaurado!", "El álbum ha sido restaurado.", "success");
            })
            .catch((error) => {
              console.error("Error al restaurar álbum:", error);
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
      this.selectedAlbum = null;
    },
    resetFormData() {
      this.formData = {
        foto_album: "",
        nombre_album: "",
        grupo_musical: "",
        integrantes: "",
        url: "",
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
    filteredAlbums() {
      const query = this.searchQuery.toLowerCase();
      return this.albums.filter(
        (album) =>
          album.nombre_album.toLowerCase().includes(query) ||
          album.grupo_musical.toLowerCase().includes(query)
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

}
img{
  width:80px !important;
  height:80px !important;
  margin-bottom: 14px !important;
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
.status-deleted {
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
}

.status-active {
  background-color: #28a745;
  /* Verde */
  color: #fff;
}

.status-deleted {
  background-color: #dc3545;
  /* Rojo */
  color: #fff;
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
  max-width: 20%;
  max-height: 50px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.image-preview {
  text-align: center;
  margin-top: 10px;
}

.preview-img {
  max-width: 80%;
  max-height: 80px; /* Controla la altura máxima de la imagen */
  object-fit: contain; /* Mantiene las proporciones de la imagen */
  border-radius: 8px; /* Añade un borde redondeado a la imagen, opcional */
  border: 1px solid #ccc; /* Añade un borde para que la imagen se vea mejor */
}

.table-container img.album-photo {
  max-width: 60px; /* Ancho máximo de la imagen */
  max-height: 70px; /* Altura máxima de la imagen */
  width: auto; /* Ancho automático para mantener la relación de aspecto */
  height: auto; /* Altura automática para mantener la relación de aspecto */
  object-fit: cover; /* Ajusta la imagen al contenedor sin distorsionar */
  border-radius: 4px; 
}


.buscar {}
</style>
