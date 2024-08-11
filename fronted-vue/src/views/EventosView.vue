<template>
  <div>
    <ProtectedNavbar />

    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Evento</h1>
          <div id="app">
            <button @click="openCreateModal">Crear Evento</button>
            <MyModal :isVisible="showCreateModal" @close="closeModal">
              <!-- Formulario para crear o editar un evento -->
              <form @submit.prevent="isEditing ? handleEdit() : handleCreate()">
                <h2>{{ isEditing ? "Editar Evento" : "Crear Evento" }}</h2>

                <div class="form-group">
                  <label for="Foto_evento">Foto del Evento (URL):</label>
                  <input
                    type="text"
                    id="Foto_evento"
                    v-model="formData.Foto_evento"
                    placeholder="URL de la foto"
                  />
                </div>

                <div v-if="formData.Foto_evento" class="image-preview">
                  <img
                    :src="formData.Foto_evento"
                    alt="Vista previa de la foto"
                    class="preview-img"
                  />
                </div>

                <div class="form-group">
                  <label for="Nombre_evento">Nombre del Evento:</label>
                  <input
                    type="text"
                    id="Nombre_evento"
                    v-model="formData.Nombre_evento"
                    required
                    placeholder="Ingrese nombre del evento"
                  />
                </div>

                <div class="form-group">
                  <label for="Descripcion">Descripción:</label>
                  <input
                    type="text"
                    id="Descripcion"
                    v-model="formData.Descripcion"
                    placeholder="Ingrese descripción"
                  />
                </div>

                <div class="form-group">
                  <label for="Ubicacion">Ubicación:</label>
                  <input
                    type="text"
                    id="Ubicacion"
                    v-model="formData.Ubicacion"
                    placeholder="Ingrese ubicación"
                  />
                </div>

                <div class="form-group">
                  <label for="Fecha">Fecha:</label>
                  <input
                    type="date"
                    id="Fecha"
                    v-model="formData.Fecha"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="Contacto">Contacto:</label>
                  <input
                    type="text"
                    id="Contacto"
                    v-model="formData.Contacto"
                    placeholder="Ingrese contacto"
                  />
                </div>

                <div class="form-group">
                  <label for="Capacidad">Capacidad:</label>
                  <input
                    type="text"
                    id="Capacidad"
                    v-model="formData.Capacidad"
                    placeholder="Ingrese capacidad"
                  />
                </div>

                <div class="form-group">
                  <label for="Artistas">Artistas:</label>
                  <input
                    type="text"
                    id="Artistas"
                    v-model="formData.Artistas"
                    placeholder="Ingrese nombres de los artistas"
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
              <!-- Información detallada del evento -->
              <div v-if="selectedEvent">
                <h2>Detalles del Evento</h2>
                <div class="form-group">
                  <label>Foto:</label>
                  <img
                    :src="selectedEvent.Foto_evento"
                    alt="Foto del evento"
                    class="preview-img"
                  />
                </div>

                <div class="form-group">
                  <label>Nombre del Evento:</label>
                  <p>{{ selectedEvent.Nombre_evento }}</p>
                </div>

                <div class="form-group">
                  <label>Descripción:</label>
                  <p>{{ selectedEvent.Descripcion }}</p>
                </div>

                <div class="form-group">
                  <label>Ubicación:</label>
                  <p>{{ selectedEvent.Ubicacion }}</p>
                </div>

                <div class="form-group">
                  <label>Fecha:</label>
                  <p>{{ selectedEvent.Fecha }}</p>
                </div>

                <div class="form-group">
                  <label>Contacto:</label>
                  <p>{{ selectedEvent.Contacto }}</p>
                </div>

                <div class="form-group">
                  <label>Capacidad:</label>
                  <p>{{ selectedEvent.Capacidad }}</p>
                </div>

                <div class="form-group">
                  <label>Artistas:</label>
                  <p>{{ selectedEvent.Artistas }}</p>
                </div>

                <div class="form-group">
                  <label>Estado:</label>
                  <p>{{ getStatusLabel(selectedEvent.estado_fk) }}</p>
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

      <!-- Tabla de Eventos -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Foto</th>
              <th>Nombre del Evento</th>
              <th>Descripción</th>
              <th>Ubicación</th>
              <th>Fecha</th>
              <th>Contacto</th>
              <th>Capacidad</th>
              <th>Artistas</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, index) in filteredEvents" :key="event.id_Evento">
              <td>{{ index + 1 }}</td>
              <td>
                <img :src="event.Foto_evento" alt="Foto" class="event-photo" />
              </td>
              <td>{{ event.Nombre_evento }}</td>
              <td>{{ event.Descripcion }}</td>
              <td>{{ event.Ubicacion }}</td>
              <td>{{ event.Fecha }}</td>
              <td>{{ event.Contacto }}</td>
              <td>{{ event.Capacidad }}</td>
              <td>{{ event.Artistas }}</td>
              <td>
                <span :class="getStatusClass(event.estado_fk)">
                  {{ getStatusLabel(event.estado_fk) }}
                </span>
              </td>
              <td>
                <div class="button-group">
                  <button class="btn view-btn" @click="viewEventDetails(event)">
                    <i class="bx bx-show"></i>
                  </button>
                  <button class="btn edit-btn" @click="startEditing(event)">
                    <i class="bx bx-edit"></i>
                  </button>
                  <button
                    class="btn delete-btn"
                    v-if="event.estado_fk === 1"
                    @click="deleteEvent(event)"
                  >
                    <i class="bx bx-trash"></i>
                  </button>
                  <button class="btn restore-btn" v-else @click="restoreEvent(event)">
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
        Foto_evento: "",
        Nombre_evento: "",
        Descripcion: "",
        Ubicacion: "",
        Fecha: "",
        Contacto: "",
        Capacidad: "",
        Artistas: "",
        estado_fk: null,
      },
      events: [],
      estados: [],
      csrfToken: "",
      isEditing: false,
      editEventId: null,
      searchQuery: "",
      selectedEvent: null,
    };
  },
  async mounted() {
    try {
      // Obtén el token CSRF del backend
      const response = await instance.get("/");
      this.csrfToken = response.data.csrfToken;
      // Configura el token CSRF en Axios
      instance.defaults.headers["X-CSRF-Token"] = this.csrfToken;
      this.fetchEvents();
      this.fetchEstados();
    } catch (error) {
      console.error("Error al obtener el token CSRF:", error);
    }
  },
  methods: {
    fetchEvents() {
      instance
        .get("/eventos")
        .then((response) => {
          this.events = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener eventos:", error);
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
        .post("/eventos", this.formData)
        .then((response) => {
          this.events.push(response.data);
          this.showCreateModal = false;
          this.resetFormData();
          Swal.fire("¡Éxito!", "El evento ha sido creado exitosamente.", "success");
        })
        .catch((error) => {
          console.error("Error al crear evento:", error);
        });
    },
    handleEdit() {
      instance
        .put(`/eventos/${this.editEventId}`, this.formData)
        .then((response) => {
          const updatedEvent = response.data;
          const index = this.events.findIndex(
            (event) => event.id_Evento === updatedEvent.id_Evento
          );
          if (index !== -1) {
            this.events.splice(index, 1, updatedEvent);
          }
          this.showCreateModal = false;
          this.isEditing = false;
          this.resetFormData();
          Swal.fire("¡Éxito!", "El evento ha sido actualizado exitosamente.", "success");
        })
        .catch((error) => {
          console.error("Error al actualizar evento:", error);
        });
    },
    startEditing(event) {
      this.isEditing = true;
      this.editEventId = event.id_Evento;
      this.formData = { ...event };
      this.showCreateModal = true;
    },
    viewEventDetails(event) {
      this.selectedEvent = event;
      this.showViewModal = true;
    },
    deleteEvent(event) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción cambiará el estado del evento a 'Eliminado'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          instance
            .put(`/eventos/${event.id_Evento}`, { ...event, estado_fk: 2 })
            .then(() => {
              event.estado_fk = 2;
              Swal.fire("¡Eliminado!", "El evento ha sido eliminado.", "success");
            })
            .catch((error) => {
              console.error("Error al eliminar evento:", error);
            });
        }
      });
    },
    restoreEvent(event) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción cambiará el estado del evento a 'Activo'.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, restaurar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          instance
            .put(`/eventos/${event.id_Evento}`, { ...event, estado_fk: 1 })
            .then(() => {
              event.estado_fk = 1;
              Swal.fire("¡Restaurado!", "El evento ha sido restaurado.", "success");
            })
            .catch((error) => {
              console.error("Error al restaurar evento:", error);
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
      this.selectedEvent = null;
    },
    resetFormData() {
      this.formData = {
        Foto_evento: "",
        Nombre_evento: "",
        Descripcion: "",
        Ubicacion: "",
        Fecha: "",
        Contacto: "",
        Capacidad: "",
        Artistas: "",
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
    filteredEvents() {
      const query = this.searchQuery.toLowerCase();
      return this.events.filter(
        (event) =>
          event.Nombre_evento.toLowerCase().includes(query) ||
          event.Descripcion.toLowerCase().includes(query) ||
          event.Ubicacion.toLowerCase().includes(query) ||
          event.Artistas.toLowerCase().includes(query)
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
  border-radius: 10px;
  margin-top: 20px; 
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: aliceblue;
  box-shadow: 1px 2px 2px 5px rgba(0, 0, 0, 0.164);
  border-radius: 20px;


}

th,
td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;

}

th {
  background-color: white;


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

.custom-preview-img  {
  max-width: 80%;
  max-height: 50px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
/* imagen de la tabla  */
.event-photo{
  width:20vh;
  border-radius:10px;
}

.song-photo {
  max-width: 70px;
  max-height: 50px;
  border-radius: 4px;
  object-fit: cover;
}
.image-preview {
  margin-top: 15px;
  text-align: center; /* Centra la imagen en el contenedor */
}

.preview-img {
  max-width: 15%; /* Asegura que la imagen no se desborde */
  height: auto;    /* Mantiene la proporción de la imagen */
  border: 1px solid #ddd; /* Añade un borde sutil alrededor de la imagen */
  border-radius: 4px; /* Añade bordes redondeados */
}

.buscar {}


</style>
