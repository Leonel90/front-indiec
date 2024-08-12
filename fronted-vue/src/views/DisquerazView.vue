<template>
  <div>
    <ProtectedNavbar />

    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Disquera</h1>
          <div id="app">
            <button @click="openCreateModal">Crear Disquera</button>
            <MyModal :isVisible="showCreateModal" @close="closeModal">
              <!-- Formulario para crear o editar una disquera -->
              <form @submit.prevent="isEditing ? handleEdit() : handleCreate()">
                <h2>{{ isEditing ? "Editar Disquera" : "Crear Disquera" }}</h2>

                <div class="form-group">
                  <label for="Foto_disquera">Foto (URL):</label>
                  <input
                    type="text"
                    id="Foto_disquera"
                    v-model="formData.Foto_disquera"
                    placeholder="URL de la foto"
                  />
                </div>

                <div v-if="formData.Foto_disquera" class="image-preview">
                  <img
                    :src="formData.Foto_disquera"
                    alt="Vista previa de la foto"
                    class="preview-img"
                  />
                </div>

                <div class="form-group">
                  <label for="Nombre_disquera">Nombre de la Disquera:</label>
                  <input
                    type="text"
                    id="Nombre_disquera"
                    v-model="formData.Nombre_disquera"
                    required
                    placeholder="Ingrese nombre de la disquera"
                  />
                </div>

                <div class="form-group">
                  <label for="Descripcion_disquera">Descripción:</label>
                  <input
                    type="text"
                    id="Descripcion_disquera"
                    v-model="formData.Descripcion_disquera"
                    placeholder="Ingrese una descripción"
                  />
                </div>

                <div class="form-group">
                  <label for="Url">URL:</label>
                  <input
                    type="text"
                    id="Url"
                    v-model="formData.Url"
                    placeholder="Ingrese URL"
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

                <div class="form-group">
                  <label for="plataforma_fk">Plataforma:</label>
                  <select v-model="formData.plataforma_fk" required>
                    <option
                      v-for="plataforma in plataformas"
                      :key="plataforma.id_plataforma"
                      :value="plataforma.id_plataforma"
                    >
                      {{ plataforma.nombre_plataforma }}
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
              <!-- Información detallada de la disquera -->
              <div v-if="selectedDisquera">
                <h2>Detalles de la Disquera</h2>
                <div class="form-group">
                  <label>Foto:</label>
                  <img
                    :src="selectedDisquera.Foto_disquera"
                    alt="Foto de la disquera"
                    class="preview-img"
                    style=""
                  />
                </div>

                <div class="form-group">
                  <label>Nombre de la Disquera:</label>
                  <p>{{ selectedDisquera.Nombre_disquera }}</p>
                </div>

                <div class="form-group">
                  <label>Descripción:</label>
                  <p>{{ selectedDisquera.Descripcion_disquera }}</p>
                </div>

                <div class="form-group">
                  <label>URL:</label>
                  <p>{{ selectedDisquera.Url }}</p>
                </div>

                <div class="form-group">
                  <label>Estado:</label>
                  <p>{{ getStatusLabel(selectedDisquera.estado_fk) }}</p>
                </div>

                <div class="form-group">
                  <label>Plataforma:</label>
                  <p>{{ getPlataformaLabel(selectedDisquera.plataforma_fk) }}</p>
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

      <!-- Tabla de Disqueras -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Foto</th>
              <th>Nombre de la Disquera</th>
              <th>Descripción</th>
              <th>URL</th>
              <th>Estado</th>
              <th>Plataforma</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(disquera, index) in filteredDisqueras" :key="disquera.id_Disquera">
              <td>{{ index + 1 }}</td>
              <td>
                <img :src="disquera.Foto_disquera" alt="Foto" class="disquera-photo" />
              </td>
              <td>{{ disquera.Nombre_disquera }}</td>
              <td>{{ disquera.Descripcion_disquera }}</td>
              <td>{{ disquera.Url }}</td>
              <td>
                <span :class="getStatusClass(disquera.estado_fk)">
                  {{ getStatusLabel(disquera.estado_fk) }}
                </span>
              </td>
              <td>{{ getPlataformaLabel(disquera.plataforma_fk) }}</td>
              <td>
                <div class="button-group">
                  <button class="btn view-btn" @click="viewDisqueraDetails(disquera)">
                    <i class="bx bx-show"></i>
                  </button>
                  <button class="btn edit-btn" @click="startEditing(disquera)">
                    <i class="bx bx-edit"></i>
                  </button>
                  <button
                    class="btn delete-btn"
                    v-if="disquera.estado_fk === 1"
                    @click="deleteDisquera(disquera)"
                  >
                    <i class="bx bx-trash"></i>
                  </button>
                  <button class="btn restore-btn" v-else @click="restoreDisquera(disquera)">
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
        Foto_disquera: "",
        Nombre_disquera: "",
        Descripcion_disquera: "",
        Url: "",
        estado_fk: null,
        plataforma_fk: null,
      },
      disqueras: [],
      estados: [],
      plataformas: [],
      csrfToken: "",
      isEditing: false,
      editDisqueraId: null,
      searchQuery: "",
      selectedDisquera: null,
    };
  },
  async mounted() {
    try {
      const response = await instance.get("/");
      this.csrfToken = response.data.csrfToken;
      instance.defaults.headers["X-CSRF-Token"] = this.csrfToken;
      this.fetchDisqueras();
      this.fetchEstados();
      this.fetchPlataformas();
    } catch (error) {
      console.error("Error al obtener el token CSRF:", error);
    }
  },
  methods: {
    fetchDisqueras() {
      instance
        .get("/disqueras")
        .then((response) => {
          this.disqueras = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener disqueras:", error);
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
    fetchPlataformas() {
      instance
        .get("/plataformas")
        .then((response) => {
          this.plataformas = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener plataformas:", error);
        });
    },
    openCreateModal() {
      this.showCreateModal = true;
    },
    closeModal() {
      this.showCreateModal = false;
      this.isEditing = false;
      this.editDisqueraId = null;
      this.formData = {
        Foto_disquera: "",
        Nombre_disquera: "",
        Descripcion_disquera: "",
        Url: "",
        estado_fk: null,
        plataforma_fk: null,
      };
    },
    startEditing(disquera) {
      this.isEditing = true;
      this.editDisqueraId = disquera.id_Disquera;
      this.formData = { ...disquera };
      this.showCreateModal = true;
    },
    handleCreate() {
      instance
        .post("/disqueras", this.formData)
        .then((response) => {
          this.fetchDisqueras();
          this.closeModal();
          Swal.fire("Disquera creada", "", "success");
        })
        .catch((error) => {
          console.error("Error al crear disquera:", error);
        });
    },
    handleEdit() {
      const editData = {
        ...this.formData,
      };

      instance
        .put(`/disqueras/${this.editDisqueraId}`, editData)
        .then((response) => {
          this.fetchDisqueras();
          this.closeModal();
          Swal.fire("Disquera actualizada", "", "success");
        })
        .catch((error) => {
          console.error("Error al actualizar disquera:", error);
        });
    },
    deleteDisquera(disquera) {
      Swal.fire({
        title: "¿Está seguro?",
        text: "No podrá revertir esto.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar.",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          instance
            .delete(`/disqueras/${disquera.id_Disquera}`)
            .then(() => {
              this.fetchDisqueras();
              Swal.fire("Eliminado", "La disquera ha sido eliminada.", "success");
            })
            .catch((error) => {
              console.error("Error al eliminar disquera:", error);
            });
        }
      });
    },
    restoreDisquera(disquera) {
  Swal.fire({
    title: "¿Está seguro?",
    text: "Está a punto de restaurar esta disquera.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, restaurar.",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      instance
        .put(`/disqueras/restore/${disquera.id_Disquera}`) // Asegúrate de que la ruta sea correcta
        .then(() => {
          this.fetchDisqueras(); // Actualiza la lista de disqueras
          Swal.fire("Restaurado", "La disquera ha sido restaurada.", "success");
        })
        .catch((error) => {
          console.error("Error al restaurar disquera:", error);
        });
    }
  });
},
    viewDisqueraDetails(disquera) {
      this.selectedDisquera = disquera;
      this.showViewModal = true;
    },
    closeViewModal() {
      this.showViewModal = false;
      this.selectedDisquera = null;
    },
    getStatusClass(estadoId) {
      const estado = this.estados.find(
        (estado) => estado.id_estado_manager === estadoId
      );
      return estado ? estado.css_class : "";
    },
    getStatusLabel(estadoId) {
      const estado = this.estados.find(
        (estado) => estado.id_estado_manager === estadoId
      );
      return estado ? estado.estado : "";
    },
    getPlataformaLabel(plataformaId) {
      const plataforma = this.plataformas.find(
        (plataforma) => plataforma.id_plataforma === plataformaId
      );
      return plataforma ? plataforma.nombre_plataforma : "";
    },
    exportToPDF() {
      // Implementar lógica para exportar a PDF
    },
    exportToExcel() {
      // Implementar lógica para exportar a Excel
    },
  },
  computed: {
    filteredDisqueras() {
      return this.disqueras.filter((disquera) =>
        disquera.Nombre_disquera.toLowerCase().includes(this.searchQuery.toLowerCase())
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
.status-delete {
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
}

.status-active {
  background-color: #28a745;
}

.status-delete {
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
  max-width: 40%;
  max-height: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.song-photo {
  max-width: 50px;
  max-height: 50px;
  border-radius: 4px;
  object-fit: cover;
}

.disquera-photo {
  max-width: 60px; /* Ancho máximo de la imagen */
  max-height: 70px; /* Altura máxima de la imagen */
  width: auto; /* Ancho automático para mantener la relación de aspecto */
  height: auto; /* Altura automática para mantener la relación de aspecto */
  object-fit: cover; /* Ajusta la imagen al contenedor sin distorsionar */
  border-radius: 4px; 
}
.buscar {}
</style>