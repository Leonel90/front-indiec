<template>
  <div>
    <ProtectedNavbar />

    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Grupo Musical</h1>
          <div id="app">
            <button @click="openCreateModal">Crear Grupo Musical</button>
            <MyModal :isVisible="showCreateModal" @close="closeModal">
              <!-- Formulario para crear o editar un grupo musical -->
              <form @submit.prevent="isEditing ? handleEdit() : handleCreate()">
                <h2>{{ isEditing ? "Editar Grupo Musical" : "Crear Grupo Musical" }}</h2>

                <div class="form-group">
                  <label for="foto_grupo">Foto (URL):</label>
                  <input
                    type="text"
                    id="foto_grupo"
                    v-model="formData.foto_grupo"
                    placeholder="URL de la foto"
                  />
                </div>

                <div v-if="formData.foto_grupo" class="image-preview">
                  <img
                    :src="formData.foto_grupo"
                    alt="Vista previa de la foto"
                    class="preview-img"
                  />
                </div>

                <div class="form-group">
                  <label for="nombre_grupo">Nombre del Grupo Musical:</label>
                  <input
                    type="text"
                    id="nombre_grupo"
                    v-model="formData.nombre_grupo"
                    required
                    placeholder="Ingrese nombre del grupo musical"
                  />
                </div>

                <div class="form-group">
                  <label for="descripcion">Descripción:</label>
                  <input
                    type="text"
                    id="descripcion"
                    v-model="formData.descripcion"
                    placeholder="Ingrese una descripción"
                  />
                </div>

                <div class="form-group">
                  <label for="url">URL:</label>
                  <input
                    type="text"
                    id="url"
                    v-model="formData.url"
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
              <!-- Información detallada del grupo musical -->
              <div v-if="selectedGrupoMusical">
                <h2>Detalles del Grupo Musical</h2>
                <div class="form-group">
                  <label>Foto:</label>
                  <img
                    :src="selectedGrupoMusical.foto_grupo"
                    alt="Foto del grupo musical"
                    class="preview-img"
                  />
                </div>

                <div class="form-group">
                  <label>Nombre del Grupo Musical:</label>
                  <p>{{ selectedGrupoMusical.nombre_grupo }}</p>
                </div>

                <div class="form-group">
                  <label>Descripción:</label>
                  <p>{{ selectedGrupoMusical.descripcion }}</p>
                </div>

                <div class="form-group">
                  <label>URL:</label>
                  <p>{{ selectedGrupoMusical.url }}</p>
                </div>

                <div class="form-group">
                  <label>Estado:</label>
                  <p>{{ getStatusLabel(selectedGrupoMusical.estado_fk) }}</p>
                </div>

                <div class="form-group">
                  <label>Plataforma:</label>
                  <p>{{ getPlataformaLabel(selectedGrupoMusical.plataforma_fk) }}</p>
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

      <!-- Tabla de Grupos Musicales -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Foto</th>
              <th>Nombre del Grupo Musical</th>
              <th>Descripción</th>
              <th>URL</th>
              <th>Estado</th>
              <th>Plataforma</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(grupoMusical, index) in filteredGruposMusicales" :key="grupoMusical.id_GrupoMusical">
              <td>{{ index + 1 }}</td>
              <td>
                <img :src="grupoMusical.foto_grupo" alt="Foto" class="grupo-musical-photo" />
              </td>
              <td>{{ grupoMusical.nombre_grupo }}</td>
              <td>{{ grupoMusical.descripcion }}</td>
              <td>{{ grupoMusical.url }}</td>
              <td>
                <span :class="getStatusClass(grupoMusical.estado_fk)">
                  {{ getStatusLabel(grupoMusical.estado_fk) }}
                </span>
              </td>
              <td>{{ getPlataformaLabel(grupoMusical.plataforma_fk) }}</td>
              <td>
                <div class="button-group">
                  <button class="btn view-btn" @click="viewGrupoMusicalDetails(grupoMusical)">
                    <i class="bx bx-show"></i>
                  </button>
                  <button class="btn edit-btn" @click="startEditing(grupoMusical)">
                    <i class="bx bx-edit"></i>
                  </button>
                  <button
                    class="btn delete-btn"
                    v-if="grupoMusical.estado_fk === 1"
                    @click="deleteGrupoMusical(grupoMusical)"
                  >
                    <i class="bx bx-trash"></i>
                  </button>
                  <button class="btn restore-btn" v-else @click="restoreGrupoMusical(grupoMusical)">
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
        foto_grupo: "",
        nombre_grupo: "",
        descripcion: "",
        url: "",
        estado_fk: null,
        plataforma_fk: null,
      },
      gruposMusicales: [],
      estados: [],
      plataformas: [],
      csrfToken: "",
      isEditing: false,
      editGrupoMusicalId: null,
      searchQuery: "",
      selectedGrupoMusical: null,
    };
  },
  async mounted() {
    try {
      const response = await instance.get("/");
      this.csrfToken = response.data.csrfToken;
      instance.defaults.headers["X-CSRF-Token"] = this.csrfToken;
      this.fetchGruposMusicales();
      this.fetchEstados();
      this.fetchPlataformas();
    } catch (error) {
      console.error("Error al obtener el token CSRF:", error);
    }
  },
  methods: {
    fetchGruposMusicales() {
      instance
        .get("/grupos-musicales")
        .then((response) => {
          this.gruposMusicales = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener grupos musicales:", error);
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
      this.isEditing = false;
      this.formData = {
        foto_grupo: "",
        nombre_grupo: "",
        descripcion: "",
        url: "",
        estado_fk: null,
        plataforma_fk: null,
      };
    },
    closeModal() {
      this.showCreateModal = false;
    },
    viewGrupoMusicalDetails(grupoMusical) {
      this.selectedGrupoMusical = grupoMusical;
      this.showViewModal = true;
    },
    closeViewModal() {
      this.showViewModal = false;
    },
    startEditing(grupoMusical) {
      this.isEditing = true;
      this.editGrupoMusicalId = grupoMusical.id_GrupoMusical;
      this.formData = { ...grupoMusical };
      this.showCreateModal = true;
    },
    async handleCreate() {
      try {
        await instance.post("/grupos-musicales", this.formData);
        Swal.fire("Éxito", "Grupo Musical creado exitosamente", "success");
        this.fetchGruposMusicales();
        this.closeModal();
      } catch (error) {
        Swal.fire("Error", "No se pudo crear el grupo musical", "error");
      }
    },
    async handleEdit() {
      try {
        await instance.put(`/grupos-musicales/${this.editGrupoMusicalId}`, this.formData);
        Swal.fire("Éxito", "Grupo Musical actualizado exitosamente", "success");
        this.fetchGruposMusicales();
        this.closeModal();
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar el grupo musical", "error");
      }
    },
    async deleteGrupoMusical(grupoMusical) {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción cambiará el estado del grupo musical a 'Eliminado'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await instance.put(`/grupos-musicales/${grupoMusical.id_GrupoMusical}`, { ...grupoMusical, estado_fk: 2 });
        Swal.fire("¡Eliminado!", "El grupo musical ha sido eliminado lógicamente.", "success");
        this.fetchGruposMusicales(); // Actualiza la lista de grupos musicales
      }
    } catch (error) {
      console.error("Error al eliminar grupo musical:", error);
      Swal.fire("Error", "No se pudo eliminar el grupo musical.", "error");
    }
  },

  async restoreGrupoMusical(grupoMusical) {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción cambiará el estado del grupo musical a 'Activo'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, restaurar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await instance.put(`/grupos-musicales/${grupoMusical.id_GrupoMusical}`, { ...grupoMusical, estado_fk: 1 });
        Swal.fire("¡Restaurado!", "El grupo musical ha sido restaurado.", "success");
        this.fetchGruposMusicales(); // Actualiza la lista de grupos musicales
      }
    } catch (error) {
      console.error("Error al restaurar grupo musical:", error);
      Swal.fire("Error", "No se pudo restaurar el grupo musical.", "error");
    }
  },
    getStatusLabel(id) {
      const estado = this.estados.find((e) => e.id_estado_manager === id);
      return estado ? estado.estado : "Desconocido";
    },
    getPlataformaLabel(id) {
      const plataforma = this.plataformas.find((p) => p.id_plataforma === id);
      return plataforma ? plataforma.nombre_plataforma : "Desconocido";
    },
    getStatusClass(id) {
      return id === 1 ? "active-status" : "inactive-status";
    },
    exportToPDF() {
      // Implementa la funcionalidad de exportación a PDF
    },
    exportToExcel() {
      // Implementa la funcionalidad de exportación a Excel
    },
  },
  computed: {
    filteredGruposMusicales() {
      const query = this.searchQuery.toLowerCase();
      return this.gruposMusicales.filter((grupo) =>
        grupo.nombre_grupo.toLowerCase().includes(query)
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
.status-deleted {
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
}

.status-active {
  background-color: #28a745; /* Verde */
}

.status-deleted {
  background-color: #dc3545; /* Rojo */
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


.image-preview {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.preview-img {
  max-width: 50px; 
  max-height: 50px; 
  object-fit: cover; 
  border: 2px solid #ddd; 
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
}
.grupo-musical-photo {
  max-width: 60px; 
  max-height: 70px;
  width: auto; 
  height: auto; 
  object-fit: cover; 
  border-radius: 4px; 
}

.buscar {}
</style>
