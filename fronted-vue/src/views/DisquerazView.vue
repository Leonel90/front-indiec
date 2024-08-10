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
              <form v-if="!isEditing" @submit.prevent="handleCreate">
                <h2>Crear Disquera</h2>

                <div class="form-group">
                  <label for="foto">Foto (URL):</label>
                  <input type="text" id="foto" v-model="formData.Foto_disquera" placeholder="URL de la foto" />
                </div>

                <div v-if="formData.Foto_disquera" class="image-preview">
                  <img :src="formData.Foto_disquera" alt="Vista previa de la imagen" class="preview-img" />
                </div>

                <div class="form-group">
                  <label for="Nombre_disquera">Nombre de la Disquera:</label>
                  <input type="text" v-model="formData.Nombre_disquera" required />
                </div>

                <div class="form-group">
                  <label for="Descripcion_disquera">Descripción:</label>
                  <input type="text" v-model="formData.Descripcion_disquera" required />
                </div>

                <div class="form-group">
                  <label for="plataforma_fk">Plataforma:</label>
                  <select v-model="formData.plataforma_fk" required>
                    <option v-for="plataforma in plataformas" :key="plataforma.id_plataforma" :value="plataforma.id_plataforma">
                      {{ plataforma.nombre_plataforma }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="estado_fk">Estado:</label>
                  <select v-model="formData.estado_fk" required>
                    <option v-for="estado in estados" :key="estado.id_estado_manager" :value="estado.id_estado_manager">
                      {{ estado.estado }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="Url">URL:</label>
                  <input type="url" v-model="formData.Url" required />
                </div>

                <div class="button-container">
                  <button type="submit">Guardar</button>
                </div>
              </form>

              <form v-else @submit.prevent="handleEdit">
                <h2>Editar Disquera</h2>

                <div class="form-group">
                  <label for="edit-foto">Foto (URL):</label>
                  <input type="text" id="edit-foto" v-model="formData.Foto_disquera" placeholder="URL de la foto" />
                </div>

                <div v-if="formData.Foto_disquera" class="image-preview">
                  <img :src="formData.Foto_disquera" alt="Vista previa de la imagen" class="preview-img" />
                </div>

                <div class="form-group">
                  <label for="edit-Nombre_disquera">Nombre de la Disquera:</label>
                  <input type="text" id="edit-Nombre_disquera" v-model="formData.Nombre_disquera" required />
                </div>

                <div class="form-group">
                  <label for="edit-Descripcion_disquera">Descripción:</label>
                  <input type="text" id="edit-Descripcion_disquera" v-model="formData.Descripcion_disquera" required />
                </div>

                <div class="form-group">
                  <label for="edit-plataforma_fk">Plataforma:</label>
                  <select id="edit-plataforma_fk" v-model="formData.plataforma_fk" required>
                    <option v-for="plataforma in plataformas" :key="plataforma.id_plataforma" :value="plataforma.id_plataforma">
                      {{ plataforma.nombre_plataforma }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="edit-estado_fk">Estado:</label>
                  <select id="edit-estado_fk" v-model="formData.estado_fk" required>
                    <option v-for="estado in estados" :key="estado.id_estado_manager" :value="estado.id_estado_manager">
                      {{ estado.estado }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="edit-Url">URL:</label>
                  <input type="url" id="edit-Url" v-model="formData.Url" required />
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
        <button class="pdf" @click="exportToPDF">PDF</button>
        <button class="excel" @click="exportToExcel">EXCEL</button>
        <input type="text" placeholder="Buscar . . ." class="buscar" v-model="searchQuery" />
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Foto</th>
              <th>Nombre de la Disquera</th>
              <th>Descripción</th>
              <th>Plataforma</th>
              <th>URL</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(disquera, index) in filteredDisqueras" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <img :src="disquera.Foto_disquera" alt="Foto" class="disquera-photo" />
              </td>
              <td>{{ disquera.Nombre_disquera }}</td>
              <td>{{ disquera.Descripcion_disquera }}</td>
              <td>{{ plataformas.find(p => p.id_plataforma === disquera.plataforma_fk)?.nombre_plataforma || 'No disponible' }}</td>
              <td><a :href="disquera.Url" target="_blank">{{ disquera.Url }}</a></td>
              <td><span :class="getDisqueraStatusClass(disquera.estado_fk)">{{ getStatusName(disquera.estado_fk) }}</span></td>
              <td>
                <div class="button-group">
                  <button class="btn view-btn" @click="viewDisqueraDetails(disquera)">
                    <i class="bx bx-show"></i>
                  </button>
                  <button class="btn edit-btn" @click="startEditing(disquera)">
                    <i class="bx bx-edit"></i>
                  </button>
                  <button class="btn delete-btn" v-if="disquera.estado_fk === 1" @click="deleteDisquera(disquera)">
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
      searchQuery: "",
      formData: {
        Nombre_disquera: "",
        Descripcion_disquera: "",
        Url: "",
        plataforma_fk: "",
        estado_fk: "", // Activo por defecto
        Foto_disquera: "",
      },
      disqueras: [],
      plataformas: [],
      estados: [],
      imagePreview: null,
      editImagePreview: null,
      isEditing: false,
      csrfToken: "", // Añadido para el token CSRF
    };
  },
  async mounted() {
    try {
      // Obtén el token CSRF del backend
      const response = await instance.get('/');
      this.csrfToken = response.data.csrfToken;
      // Configura el token CSRF en Axios
      instance.defaults.headers['X-CSRF-Token'] = this.csrfToken;
      this.fetchDisqueras();
      this.fetchPlataformas();
      this.fetchEstados();
    } catch (error) {
      console.error('Error al obtener el token CSRF:', error);
    }
  },
  methods: {
    async fetchDisqueras() {
      try {
        const response = await instance.get('/disqueras');
        this.disqueras = response.data;
      } catch (error) {
        console.error('Error fetching disqueras:', error);
      }
    },
    async fetchPlataformas() {
      try {
        const response = await instance.get('/plataformas');
        this.plataformas = response.data;
      } catch (error) {
        console.error('Error fetching plataformas:', error);
      }
    },
    async fetchEstados() {
      try {
        const response = await instance.get('/estadoManager');
        this.estados = response.data;
      } catch (error) {
        console.error('Error fetching estados:', error);
      }
    },
    openCreateModal() {
      this.showCreateModal = true;
      this.resetForm();
      this.isEditing = false;
    },
    closeModal() {
      this.showCreateModal = false;
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        Nombre_disquera: "",
        Descripcion_disquera: "",
        Url: "",
        plataforma_fk: "",
        estado_fk: "", // Activo por defecto
        Foto_disquera: "",
      };
      this.imagePreview = null;
      this.editImagePreview = null;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.Foto_disquera = file;
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    handleEditFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.Foto_disquera = file;
        this.editImagePreview = URL.createObjectURL(file);
      }
    },
    async handleCreate() {
      // Verifica que los datos necesarios estén presentes
      if (!this.formData.Nombre_disquera || !this.formData.plataforma_fk) {
        Swal.fire('Advertencia', 'Nombre de disquera y plataforma son obligatorios', 'warning');
        return;
      }

      // Crea un FormData para enviar el archivo y otros datos
      const formData = new FormData();
      for (const key in this.formData) {
        formData.append(key, this.formData[key]);
      }

      try {
        // Realiza la solicitud POST al servidor
        await instance.post('/disqueras', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // Muestra un mensaje de éxito
        Swal.fire('Éxito', 'Disquera creada correctamente', 'success');
        // Actualiza la lista de disqueras
        this.fetchDisqueras();
        // Cierra el modal y reinicia el formulario
        this.closeModal();
      } catch (error) {
        // Muestra un mensaje de error
        Swal.fire('Error', 'Error al crear disquera: ' + error.response?.data?.message || 'Error desconocido', 'error');
      }
    },
    startEditing(disquera) {
  this.isEditing = true;
  this.formData = { ...disquera };
  this.editImagePreview = disquera.Foto_disquera;
  this.openCreateModal();
},
async handleSave() {
  if (this.isEditing) {
    // Llamar al método de edición
    await this.handleEdit();
  } else {
    // Llamar al método de creación
    await this.handleCreate();
  }
},

    
async handleEdit() {
  const formData = new FormData();
  for (const key in this.formData) {
    formData.append(key, this.formData[key]);
  }

  try {
    await instance.put(`/disqueras/${this.formData.id_Disquera}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    Swal.fire('Éxito', 'Disquera actualizada correctamente', 'success');
    this.fetchDisqueras();
    this.closeModal();
  } catch (error) {
    Swal.fire('Error', 'Error al actualizar disquera: ' + error.response?.data?.message || 'Error desconocido', 'error');
  }
},
    async deleteDisquera(disquera) {
      try {
        await instance.delete(`/disqueras/${disquera.id_Disquera}`);
        Swal.fire('Éxito', 'Disquera eliminada correctamente', 'success');
        this.fetchDisqueras();
      } catch (error) {
        Swal.fire('Error', 'Error al eliminar disquera: ' + error.response?.data?.message || 'Error desconocido', 'error');
      }
    },
    viewDisqueraDetails(disquera) {
      // Implementa la lógica para ver detalles si es necesario
    },
    getPlataformaName(plataformaId) {
      const plataforma = this.plataformas.find(p => p.id_plataforma === plataformaId);
      return plataforma ? plataforma.nombre_plataforma : 'Desconocida';
    },
    getStatusName(statusId) {
      const estado = this.estados.find(e => e.id_estado_manager === statusId);
      return estado ? estado.nombre_estado : 'Desconocido';
    },
    getDisqueraStatusClass(statusId) {
      // Implementa clases según el estado si es necesario
    }
  },
  computed: {
    filteredDisqueras() {
      if (!this.searchQuery) return this.disqueras;
      const query = this.searchQuery.toLowerCase();
      return this.disqueras.filter(disquera =>
        disquera.Nombre_disquera.toLowerCase().includes(query) ||
        disquera.Descripcion_disquera.toLowerCase().includes(query)
      );
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

.custom-image-preview {
  margin-top: 10px;
}

.preview-img {
  max-width: 150px; /* Tamaño máximo ajustado */
  max-height: 150px; /* Tamaño máximo ajustado */
  object-fit: cover;
}
</style>