<template>
  <div>
    <ProtectedNavbar />

    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Manager</h1>
          <div id="app">
            <button @click="openCreateModal">Crear Manager</button>
            <MyModal :isVisible="showCreateModal" @close="closeModal">
              <!-- Formulario para crear o editar un manager -->
              <form @submit.prevent="isEditing ? handleEdit() : handleCreate()">
                <h2>{{ isEditing ? "Editar Manager" : "Crear Manager" }}</h2>

                <div class="form-group">
                  <label for="foto_manager">Foto (URL):</label>
                  <input
                    type="text"
                    id="foto_manager"
                    v-model="formData.Foto_manager"
                    placeholder="URL de la foto"
                  />
                </div>

                <div v-if="formData.Foto_manager" class="image-preview">
                  <img
                    :src="formData.Foto_manager"
                    alt="Vista previa de la foto"
                    class="preview-img"
                  />
                </div>

                <div class="form-group">
                  <label for="apellidos">Apellidos:</label>
                  <input
                    type="text"
                    id="apellidos"
                    v-model="formData.Apellidos"
                    required
                    placeholder="Ingrese apellidos"
                  />
                </div>

                <div class="form-group">
                  <label for="nombres">Nombres:</label>
                  <input
                    type="text"
                    id="nombres"
                    v-model="formData.Nombres"
                    required
                    placeholder="Ingrese nombres"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.Email"
                    required
                    placeholder="Ingrese email"
                  />
                </div>

                <div class="form-group">
                  <label for="genero_fk">Género:</label>
                  <select v-model="formData.genero_fk" required>
                    <option
                      v-for="genero in generos"
                      :key="genero.id_genero"
                      :value="genero.id_genero"
                    >
                      {{ genero.nombre_genero }}
                    </option>
                  </select>
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
              <!-- Información detallada del manager -->
              <div v-if="selectedManager">
                <h2>Detalles del Manager</h2>
                <div class="form-group">
                  <label>Foto:</label>
                  <img
                    :src="selectedManager.Foto_manager"
                    alt="Foto del manager"
                    class="preview-img"
                  />
                </div>

                <div class="form-group">
                  <label>Apellidos:</label>
                  <p>{{ selectedManager.Apellidos }}</p>
                </div>

                <div class="form-group">
                  <label>Nombres:</label>
                  <p>{{ selectedManager.Nombres }}</p>
                </div>

                <div class="form-group">
                  <label>Email:</label>
                  <p>{{ selectedManager.Email }}</p>
                </div>

                <div class="form-group">
                  <label>Género:</label>
                  <p>{{ getGeneroLabel(selectedManager.genero_fk) }}</p>
                </div>

                <div class="form-group">
                  <label>Estado:</label>
                  <p>{{ getStatusLabel(selectedManager.estado_fk) }}</p>
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

      <!-- Tabla de Managers -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Foto</th>
              <th>Apellidos</th>
              <th>Nombres</th>
              <th>Email</th>
              <th>Género</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(manager, index) in filteredManagers" :key="manager.id_Manager">
              <td>{{ index + 1 }}</td>
              <td>
                <img :src="manager.Foto_manager" alt="Foto" class="manager-photo" />
              </td>
              <td>{{ manager.Apellidos }}</td>
              <td>{{ manager.Nombres }}</td>
              <td>{{ manager.Email }}</td>
              <td>
                <span :class="getGeneroClass(manager.genero_fk)">
                  {{ getGeneroLabel(manager.genero_fk) }}
                </span>
              </td>
              <td>
                <span :class="getStatusClass(manager.estado_fk)">
                  {{ getStatusLabel(manager.estado_fk) }}
                </span>
              </td>
              <td>
                <div class="button-group">
                  <button class="btn view-btn" @click="viewManagerDetails(manager)">
                    <i class="bx bx-show"></i>
                  </button>
                  <button class="btn edit-btn" @click="startEditing(manager)">
                    <i class="bx bx-edit"></i>
                  </button>
                  <button
                    class="btn delete-btn"
                    v-if="manager.estado_fk === 1"
                    @click="deleteManager(manager)"
                  >
                    <i class="bx bx-trash"></i>
                  </button>
                  <button class="btn restore-btn" v-else @click="restoreManager(manager)">
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
        Foto_manager: "",
        Apellidos: "",
        Nombres: "",
        Email: "",
        genero_fk: null,
        estado_fk: null,
      },
      managers: [],
      generos: [],
      estados: [],
      csrfToken: "",
      isEditing: false,
      editManagerId: null,
      searchQuery: "",
      selectedManager: null,
    };
  },
  async mounted() {
    try {
      // Obtén el token CSRF del backend
      const response = await instance.get("/");
      this.csrfToken = response.data.csrfToken;
      // Configura el token CSRF en Axios
      instance.defaults.headers["X-CSRF-Token"] = this.csrfToken;
      this.fetchManagers();
      this.fetchGeneros();
      this.fetchEstados();
    } catch (error) {
      console.error("Error al obtener el token CSRF:", error);
    }
  },
  methods: {
    async fetchManagers() {
      try {
        const response = await instance.get("/managers");
        this.managers = response.data;
      } catch (error) {
        console.error("Error al obtener managers:", error);
      }
    },
    async fetchGeneros() {
      try {
        const response = await instance.get("/generoPersonas");
        this.generos = response.data;
      } catch (error) {
        console.error("Error al obtener géneros:", error);
      }
    },
    async fetchEstados() {
      try {
        const response = await instance.get("/estadoManager");
        this.estados = response.data;
      } catch (error) {
        console.error("Error al obtener estados:", error);
      }
    },
    openCreateModal() {
      this.isEditing = false;
      this.formData = {
        Foto_manager: "",
        Apellidos: "",
        Nombres: "",
        Email: "",
        genero_fk: null,
        estado_fk: null,
      };
      this.showCreateModal = true;
    },
    closeModal() {
      this.showCreateModal = false;
    },
    closeViewModal() {
      this.showViewModal = false;
    },
    async handleCreate() {
      try {
        await instance.post("/managers", this.formData);
        Swal.fire("Éxito", "Manager creado exitosamente", "success");
        this.fetchManagers();
        this.closeModal();
      } catch (error) {
        console.error("Error al crear el manager:", error);
        Swal.fire("Error", "No se pudo crear el manager", "error");
      }
    },
    async handleEdit() {
      try {
        await instance.put(`/managers/${this.editManagerId}`, this.formData);
        Swal.fire("Éxito", "Manager actualizado exitosamente", "success");
        this.fetchManagers();
        this.closeModal();
      } catch (error) {
        console.error("Error al actualizar el manager:", error);
        Swal.fire("Error", "No se pudo actualizar el manager", "error");
      }
    },
    startEditing(manager) {
      this.isEditing = true;
      this.editManagerId = manager.id_Manager;
      this.formData = { ...manager };
      this.showCreateModal = true;
    },
    async deleteManager(manager) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción cambiará el estado del manager a 'Eliminado'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await instance.put(`/managers/${manager.id_Manager}`, { ...manager, estado_fk: 2 });
            // Actualiza el estado del manager en el array local
            const index = this.managers.findIndex(m => m.id_Manager === manager.id_Manager);
            if (index !== -1) {
              this.managers[index].estado_fk = 2;
            }
            Swal.fire("¡Eliminado!", "El manager ha sido eliminado.", "success");
          } catch (error) {
            console.error("Error al eliminar el manager:", error);
            Swal.fire("Error", "No se pudo eliminar el manager", "error");
          }
        }
      });
    },
    async restoreManager(manager) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción cambiará el estado del manager a 'Activo'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, restaurar",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await instance.put(`/managers/${manager.id_Manager}`, { ...manager, estado_fk: 1 });
            // Actualiza el estado del manager en el array local
            const index = this.managers.findIndex(m => m.id_Manager === manager.id_Manager);
            if (index !== -1) {
              this.managers[index].estado_fk = 1;
            }
            Swal.fire("¡Restaurado!", "El manager ha sido restaurado.", "success");
          } catch (error) {
            console.error("Error al restaurar el manager:", error);
            Swal.fire("Error", "No se pudo restaurar el manager", "error");
          }
        }
      });
    },
    viewManagerDetails(manager) {
      this.selectedManager = manager;
      this.showViewModal = true;
    },
    getGeneroLabel(id) {
      const genero = this.generos.find(g => g.id_genero === id);
      return genero ? genero.nombre_genero : "Desconocido";
    },
    getStatusLabel(id) {
      const estado = this.estados.find(e => e.id_estado_manager === id);
      return estado ? estado.estado : "Desconocido";
    },
    getGeneroClass(id) {
      const genero = this.generos.find(g => g.id_genero === id);
      return genero ? `genero-${(genero.nombre_genero || '').toLowerCase()}` : "genero-desconocido";
    },
    getStatusClass(id) {
      const estado = this.estados.find(e => e.id_estado_manager === id);
      return estado ? `estado-${(estado.estado || '').toLowerCase()}` : "estado-desconocido";
    },
    exportToPDF() {
      // Implementa la lógica para exportar a PDF
    },
    exportToExcel() {
      // Implementa la lógica para exportar a Excel
    },
  },
  computed: {
    filteredManagers() {
      return this.managers.filter(manager => 
        manager.Apellidos.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        manager.Nombres.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        manager.Email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
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

/* Estilos para la tabla */
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

.user-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.status-active {
  color: #fff;
  background-color: #28a745;
  padding: 5px 10px;
  border-radius: 15px;
}

.status-inactive {
  color: #fff;
  background-color: #dc3545;
  padding: 5px 10px;
  border-radius: 15px;
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

/* Estilos de la vista previa de la imagen */

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
.custom-image-preview {
  margin-top: 10px;
}

.custom-preview-img {
  max-width: 40%;
  max-height: 30px;
  border: 1px solid #ddd;
  border-radius: 4px;
}


.manager-photo {
  max-width: 60px; /* Ancho máximo de la imagen */
  max-height: 70px; /* Altura máxima de la imagen */
  width: auto; /* Ancho automático para mantener la relación de aspecto */
  height: auto; /* Altura automática para mantener la relación de aspecto */
  object-fit: cover; /* Ajusta la imagen al contenedor sin distorsionar */
  border-radius: 4px; 
}

.modal-content {
  padding: 20px;
  max-width: 200px;
  max-height: 50vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 15px;
}

.preview-img {
  max-width: 200%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}
.buscar {}
</style>
