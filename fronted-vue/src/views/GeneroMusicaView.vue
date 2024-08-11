<template>
  <div>
    <ProtectedNavbar />
    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Genero Musical</h1>
          <div id="app">
            <button @click="showCreateModal = true">Crear Genero</button>
            <MyModal :isVisible="showCreateModal" @close="closeModal">
              <form v-if="!isEditing" @submit.prevent="createGeneroMusical">
                <h2>Crear Genero</h2>
                <div class="form-group">
                  <label for="songName">Nombre del genero:</label>
                  <input type="text" v-model="formData.songName" required />
                </div>
                <div class="button-container">
                  <button type="submit">Guardar Cambios</button>
                </div>
              </form>
              <form v-else @submit.prevent="updateGeneroMusical">
                <h2>Editar Genero</h2>
                <div class="form-group">
                  <label for="songName">Nombre del genero:</label>
                  <input type="text" v-model="formData.songName" required />
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
                <th><div class="cell">Acciones</div></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(genero, index) in generos" :key="genero.id_genero">
                <td><div class="cell">{{ index + 1 }}</div></td>
                <td><div class="cell">{{ genero.genero_musical_text }}</div></td>
                <td>
                  <div class="button-group">
                    <button class="btn delete-btn" @click="deleteGeneroMusical(genero)">
                      <i class="bx bx-trash"></i> Eliminar
                    </button>
                    <button class="btn edit-btn" @click="editGeneroMusical(genero)">
                      <i class="bx bx-edit"></i> Editar
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
      formData: {
        songName: "",
      },
      generos: [],
      csrfToken: '',
      isEditing: false,
      editGeneroId: null,
    };
  },
  async mounted() {
    try {
      // Obtén el token CSRF del backend
      const response = await instance.get('/');
      this.csrfToken = response.data.csrfToken;
      // Configura el token CSRF en Axios
      instance.defaults.headers['X-CSRF-Token'] = this.csrfToken;
      this.fetchGenerosMusicales();
    } catch (error) {
      console.error('Error al obtener el token CSRF:', error);
    }
  },
  methods: {
    fetchGenerosMusicales() {
      instance.get('/generos')
        .then(response => {
          this.generos = response.data;
        })
        .catch(error => {
          console.error('Error al obtener géneros musicales:', error);
        });
    },
    createGeneroMusical() {
      instance.post('/generos', { genero_musical_text: this.formData.songName })
        .then(response => {
          this.generos.push(response.data);
          this.showCreateModal = false;
          this.resetFormData();
          Swal.fire("¡Éxito!", "El género ha sido creado exitosamente.", "success");
        })
        .catch(error => {
          console.error('Error al crear género musical:', error);
        });
    },
    editGeneroMusical(genero) {
      this.isEditing = true;
      this.editGeneroId = genero.id_genero;
      this.formData.songName = genero.genero_musical_text;
      this.showCreateModal = true;
    },
    updateGeneroMusical() {
      instance.put(`/generos/${this.editGeneroId}`, { genero_musical_text: this.formData.songName })
        .then(response => {
          const updatedGenero = response.data;
          const index = this.generos.findIndex(g => g.id_genero === updatedGenero.id_genero);
          if (index !== -1) {
            this.generos.splice(index, 1, updatedGenero);
          }
          this.showCreateModal = false;
          this.isEditing = false;
          this.resetFormData();
          Swal.fire("¡Éxito!", "El género ha sido actualizado exitosamente.", "success");
        })
        .catch(error => {
          console.error('Error al actualizar género musical:', error);
        });
    },
    deleteGeneroMusical(genero) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Una vez eliminado, no podrás recuperar este género musical.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          instance.delete(`/generos/${genero.id_genero}`)
            .then(() => {
              const index = this.generos.indexOf(genero);
              if (index !== -1) {
                this.generos.splice(index, 1);
                Swal.fire('¡Eliminado!', 'El género ha sido eliminado exitosamente.', 'success');
              }
            })
            .catch(error => {
              console.error('Error al eliminar género musical:', error);
            });
        }
      });
    },
    closeModal() {
      this.showCreateModal = false;
      this.isEditing = false;
      this.resetFormData();
    },
    resetFormData() {
      this.formData.songName = "";
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
  background-color: #067b80;
  color: white;
  border-radius: 13px;
  text-transform: capitalize;
}

#delete {
  background-color: #c90000;
  color: white !important;
}

#delete :hover {
  background-color: #ff0202;
  color: white;
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
  max-width: 800px; /* Ajusta el ancho máximo si es necesario */
  background-color: aliceblue;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
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
  background-color: #4caf50;
  color: white;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.137);
}

.edit-btn {
  background-color: #ffa500;
  color: white;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.137);
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

.buscar {}
</style>
