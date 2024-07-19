<template>
  <div>
    <ProtectedNavbar />
    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Genero Musical</h1>
          <div id="app">
            <button @click="showCreateModal = true">Crear Genero</button>
            <MyModal :isVisible="showCreateModal" @close="showCreateModal = false">
              <form v-if="!isEditing" @submit.prevent="handleCreate">
                <h2>Crear Genero</h2>

                <div class="form-group">
                  <label for="songName">Nombre del genero:</label>
                  <input type="text" v-model="formData.songName" required />
                </div>
                <div class="form-group">
                  <label for="artistName">Fecha:</label>
                  <input type="date" v-model="formData.artistName" min="2013-01-01" max="2048-12-31" />
                </div>
                <div class="button-container">
                  <button type="submit">Guardar Cambios</button>
                </div>
              </form>

              <form v-else @submit.prevent="handleEdit">
                <h2>Editar Canción</h2>
                <div class="form-group">
                  <label for="songName">Nombre del Genero:</label>
                  <input type="text" v-model="formData.songName" required />
                </div>
                <div class="form-group">
                  <label for="artistName">Fecha:</label>
                  <input type="date" v-model="formData.artistName" min="2013-01-01" max="2048-12-31" />
                </div>
                <div class="button-container">
                  <button type="submit">Guardar Cambios</button>
                </div>
              </form>
            </MyModal>
          </div>
        </div>
      </div>
      <br />
      <div class="container">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><div class="cell">#</div></th>
                <th><div class="cell">Nombre del Genero</div></th>
                <th><div class="cell">Fecha de Creacion</div></th>
                <th><div class="cell">Acciones</div></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(song, index) in songs" :key="index">
                <td>
                  <div class="cell">{{ index + 1 }}</div>
                </td>
                <td>
                  <div class="cell">{{ song.songName }}</div>
                </td>
                <td>
                  <div class="cell">{{ song.artistName }}</div>
                </td>
                <td>
                  <div class="button-group">
                    <button class="btn view-btn" @click="viewSongDetails(song)">
                      <i class="bx bx-show"></i>
                    </button>
                    <button class="btn edit-btn" @click="startEditing(song)">
                      <i class="bx bx-edit"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";
import MyModal from "../components/Modal.vue";
import { Calendar } from "primevue/calendar";
import Swal from "sweetalert2";

export default {
  components: {
    ProtectedNavbar,
    MyModal,
    Calendar
  },
  data() {
    return {
      showCreateModal: false,
      formData: {
        songName: "",
        artistName: "",
      },
      songs: [
        {
          songName: "Salsa",
          artistName: "2024-07-18",
        },
        {
          songName: "Rock",
          artistName: "2024-07-18",
        },
        {
          songName: "Punk",
          artistName: "2024-07-18",
        },
      ],
      isEditing: false,
      editIndex: null,
    };
  },
  methods: {
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
      Swal.fire("¡Éxito!", "El género ha sido creado exitosamente.", "success");
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
        Swal.fire("¡Éxito!", "El género ha sido actualizado exitosamente.", "success");
      }
    },
    resetFormData() {
      this.formData = {
        songName: "",
        artistName: null,
      };
    },
    deleteSong(song) {
      song.status = "Eliminado";
      Swal.fire("¡Éxito!", "El género ha sido eliminado exitosamente.", "success");
    },
    restoreSong(song) {
      song.status = "Activo";
      Swal.fire("¡Éxito!", "El género ha sido restaurado exitosamente.", "success");
    },
    viewSongDetails(song) {
      Swal.fire({
        title: `Detalles de ${song.songName}`,
        html: `
          <p><strong>Género Musical:</strong> ${song.songName}</p>
          <p><strong>Fecha Creación:</strong> ${song.artistName}</p>
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
  font-family: "Times New Roman", Times, serif;
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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.table-container {
  width: 80%;
  max-width: 1000px;
  background-color: aliceblue;
  padding: 20px;
  border-radius: 10px;
  box-shadow:  2px 2px 2px 2px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;

}


.cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-group {
  display: flex;
  justify-content: center; 
  gap: 5px;
}

.btn {
  padding: 3px 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.view-btn {
  background-color: #4CAF50;
  color: white;
  box-shadow:  2px 2px 2px 2px rgba(0, 0, 0, 0.137);

}

.edit-btn {
  background-color: #FFA500;
  color: white;
  box-shadow:  2px 2px 2px 2px rgba(0, 0, 0, 0.137);

}

.restore-btn {
  background-color: #17a2b8;
  color: #fff;
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

.custom-calendar .p-datepicker {
  font-size: 0.8em; /* Ajusta el tamaño de la fuente */
}

.custom-calendar .p-inputtext {
  padding: 0.25em 0.5em; /* Ajusta el relleno del campo de entrada */
}

.custom-calendar .p-datepicker .p-datepicker-header,
.custom-calendar .p-datepicker .p-datepicker-calendar-container {
  padding: 0.5em; /* Ajusta el relleno del encabezado y el contenedor del calendario */
}

.custom-calendar .p-datepicker table {
  font-size: 0.4em; /* Ajusta el tamaño de la fuente dentro del calendario */
}

.custom-calendar .p-datepicker .p-datepicker-header {
  font-size: 0.4em; /* Ajusta el tamaño de la fuente del encabezado */
}

.custom-calendar .p-datepicker .p-datepicker-today,
.custom-calendar .p-datepicker .p-datepicker-title {
  font-size: 0.9em; /* Ajusta el tamaño de la fuente del título */
}

.custom-calendar .p-datepicker td {
  padding: 0.3em; /* Ajusta el relleno de las celdas del calendario */
}

.custom-calendar .p-datepicker .p-datepicker-prev,
.custom-calendar .p-datepicker .p-datepicker-next {
  height: 1em; /* Ajusta la altura de los botones de navegación */
}
</style>
