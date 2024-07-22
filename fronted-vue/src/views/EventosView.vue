<template>
  <div>
    <ProtectedNavbar />
    
    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Eventos</h1>
          <div id="app">
            <button @click="showCreateModal = true">Crear Evento</button>
            <MyModal :isVisible="showCreateModal" @close="showCreateModal = false">
              <form v-if="!isEditing" @submit.prevent="handleCreate">
                <h2>Crear Evento</h2>
                
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
                  <label for="eventName">Nombre del Evento:</label>
                  <input type="text" v-model="formData.eventName" required />
                </div>
                <div class="form-group">
                  <label for="description">Descripción:</label>
                  <input type="text" v-model="formData.description" required />
                </div>
                <div class="form-group">
                  <label for="location">Ubicación:</label>
                  <input type="text" v-model="formData.location" required />
                </div>
                <div class="form-group">
                  <label for="date">Fecha:</label>
                  <input type="date" v-model="formData.date" required />
                </div>
                <div class="form-group">
                  <label for="url">URL:</label>
                  <input type="url" v-model="formData.url" required />
                </div>
                <div class="form-group">
                  <label for="contact">Contacto:</label>
                  <input type="text" v-model="formData.contact" required />
                </div>
                <div class="form-group">
                  <label for="capacity">Capacidad:</label>
                  <input type="number" v-model="formData.capacity" required />
                </div>
                <div class="form-group">
                  <label for="artists">Artistas:</label>
                  <textarea v-model="formData.artists" placeholder="Ingrese los nombres de los artistas, separados por comas" required></textarea>
                </div>
                <div class="button-container">
                  <button type="submit">Guardar</button>
                </div>
              </form>

              <form v-else @submit.prevent="handleEdit">
                <h2>Editar Evento</h2>
                
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
                  <label for="eventName">Nombre del Evento:</label>
                  <input type="text" v-model="formData.eventName" required />
                </div>
                <div class="form-group">
                  <label for="description">Descripción:</label>
                  <input type="text" v-model="formData.description" required />
                </div>
                <div class="form-group">
                  <label for="location">Ubicación:</label>
                  <input type="text" v-model="formData.location" required />
                </div>
                <div class="form-group">
                  <label for="date">Fecha:</label>
                  <input type="date" v-model="formData.date" required />
                </div>
                <div class="form-group">
                  <label for="url">URL:</label>
                  <input type="url" v-model="formData.url" required />
                </div>
                <div class="form-group">
                  <label for="contact">Contacto:</label>
                  <input type="text" v-model="formData.contact" required />
                </div>
                <div class="form-group">
                  <label for="capacity">Capacidad:</label>
                  <input type="number" v-model="formData.capacity" required />
                </div>
                <div class="form-group">
                  <label for="artists">Artistas:</label>
                  <textarea v-model="formData.artists" placeholder="Ingrese los nombres de los artistas, separados por comas" required></textarea>
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
              <th><div class="cell">Nombre del Evento</div></th>
              <th><div class="cell">Descripción</div></th>
              <th><div class="cell">Ubicación</div></th>
              <th><div class="cell">Fecha</div></th>
              <th><div class="cell">Contacto</div></th>
              <th><div class="cell">Capacidad</div></th>
              <th><div class="cell">Artistas</div></th>
              <th><div class="cell">Estado</div></th>
              <th><div class="cell">Acciones</div></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, index) in filteredEvents" :key="index">
              <td>
                <div class="cell">{{ index + 1 }}</div>
              </td>
              <td>
                <div class="cell">
                  <img :src="event.photo" alt="Foto" class="event-photo" />
                </div>
              </td>
              <td>
                <div class="cell">{{ event.eventName }}</div>
              </td>
              <td>
                <div class="cell">{{ event.description }}</div>
              </td>
              <td>
                <div class="cell">{{ event.location }}</div>
              </td>
              <td>
                <div class="cell">{{ event.date }}</div>
              </td>
              <td>
                <div class="cell">{{ event.contact }}</div>
              </td>
              <td>
                <div class="cell">{{ event.capacity }}</div>
              </td>
              <td>
                <div class="cell">
                  <div class="scroll-container">
                    <div v-for="artist in event.artistsList" :key="artist">{{ artist }}</div>
                  </div>
                </div>
              </td>
              <td>
                <span :class="getEventStatusClass(event.status)">
                  {{ event.status }}
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
                    v-if="event.status === 'Activo'"
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
        eventName: "",
        description: "",
        location: "",
        date: "",
        url: "",
        contact: "",
        capacity: "",
        artists: "", 
        photo: "", 
      },
      events: [
        {
          eventName: "Concierto de Rock",
          description: "Un evento emocionante con las mejores bandas de rock.",
          location: "Madison Square Garden, NY",
          date: "2024-08-15",
          url: "https://example.com/concierto-rock",
          contact: "contacto@rockeventos.com",
          capacity: 5000,
          artists: "The Rockers, The Bandits",
          artistsList: ["The Rockers", "The Bandits"],
          photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1GMNYbY19i8wfENiGt6brnICTDjz5Rllhjw&s",
          status: "Activo",
        },
        {
          eventName: "Festival de Jazz",
          description: "Un festival con los músicos de jazz más renombrados.",
          location: "Central Park, NY",
          date: "2024-09-10",
          url: "https://example.com/festival-jazz",
          contact: "contacto@jazzfestival.com",
          capacity: 3000,
          artists: "Smooth Jazz, Blue Note",
          artistsList: ["Smooth Jazz", "Blue Note"],
          photo: "https://www.caravanjazz.es/wp-content/uploads/2020/01/fb-roots.jpg",
          status: "Activo",
        },
        {
          eventName: "Exposición de Arte Moderno",
          description: "Una muestra de las últimas tendencias en arte moderno.",
          location: "Museo de Arte Moderno, NY",
          date: "2024-10-05",
          url: "https://example.com/exposicion-arte",
          contact: "contacto@arteexpo.com",
          capacity: 1000,
          artists: "Artistas Emergentes, Galería Arte",
          artistsList: ["Artistas Emergentes", "Galería Arte"],
          photo: "https://i0.wp.com/evemuseografia.com/wp-content/uploads/2020/01/EVE06012020-1.jpg?fit=1170%2C613&ssl=1",
          status: "Activo",
        }
      ],
      isEditing: false,
      editIndex: null,
      imagePreview: null, 
      editImagePreview: null, 
    };
  },
  computed: {
    filteredEvents() {
      const query = this.searchQuery.toLowerCase();
      return this.events.filter(
        (event) =>
          event.eventName.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.date.toLowerCase().includes(query) ||
          event.url.toLowerCase().includes(query) ||
          event.contact.toLowerCase().includes(query) ||
          event.capacity.toString().includes(query) ||
          event.artists.toLowerCase().includes(query) ||
          event.status.toLowerCase().includes(query)
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
      const newEvent = { ...this.formData, artistsList: this.formData.artists.split(',').map(a => a.trim()) };
      this.events.push(newEvent);
      this.showCreateModal = false;
      this.resetFormData();
      this.imagePreview = null; 
      Swal.fire("¡Éxito!", "El Evento ha sido creado exitosamente.", "success");
    },
    startEditing(event) {
      this.isEditing = true;
      this.formData = { ...event, artists: event.artistsList.join(', ') };
      this.editIndex = this.events.indexOf(event);
      this.showCreateModal = true;
    },
    handleEdit() {
      if (this.editIndex !== null) {
        const updatedEvent = { ...this.formData, artistsList: this.formData.artists.split(',').map(a => a.trim()) };
        this.events.splice(this.editIndex, 1, updatedEvent);
        this.showCreateModal = false;
        this.isEditing = false;
        this.resetFormData();
        this.editImagePreview = null; 
        Swal.fire("¡Éxito!", "El Evento ha sido actualizado exitosamente.", "success");
      }
    },
    resetFormData() {
      this.formData = {
        eventName: "",
        description: "",
        location: "",
        date: "",
        url: "",
        contact: "",
        capacity: "",
        artists: "", 
        photo: "", 
      };
    },
    deleteEvent(event) {
      event.status = "Eliminado";
      Swal.fire("¡Éxito!", "El Evento ha sido eliminado exitosamente.", "success");
    },
    restoreEvent(event) {
      event.status = "Activo";
      Swal.fire("¡Éxito!", "El Evento ha sido restaurado exitosamente.", "success");
    },
    viewEventDetails(event) {
      Swal.fire({
        title: `Detalles del Evento ${event.eventName}`,
        html: `
          <div>
            <img src="${event.photo}" alt="Foto de ${event.eventName}" style="max-width: 100%; height: auto;">
          </div>
          <p><strong>Nombre del Evento:</strong> ${event.eventName}</p>
          <p><strong>Descripción:</strong> ${event.description}</p>
          <p><strong>Ubicación:</strong> ${event.location}</p>
          <p><strong>Fecha:</strong> ${event.date}</p>
          <p><strong>URL:</strong> <a href="${event.url}" target="_blank">${event.url}</a></p>
          <p><strong>Contacto:</strong> ${event.contact}</p>
          <p><strong>Capacidad:</strong> ${event.capacity}</p>
          <p><strong>Artistas:</strong> ${event.artists}</p>
          <p><strong>Estado:</strong> ${event.status}</p>
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
    getEventStatusClass(status) {
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

</style>
