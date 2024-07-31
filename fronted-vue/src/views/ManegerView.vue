<template>
  <div>
    <ProtectedNavbar />
    <!-- Modal Crear Manager -->
    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Manager</h1>
          <div id="app">
            <button @click="showCreateModal = true">Crear Manager</button>
            <MyModal :isVisible="showCreateModal" @close="closeModals">
              <form @submit.prevent="handleCreate">
                <h2>Crear Manager</h2>
                <div class="form-group">
                  <label for="nombre">Nombres:</label>
                  <input type="text" v-model="formData.firstName" required />
                </div>
                <div class="form-group">
                  <label for="apellido">Apellidos:</label>
                  <input type="text" v-model="formData.lastName" required />
                </div>
                <div class="form-group">
                  <label for="correo">Correo:</label>
                  <input type="email" v-model="formData.email" required />
                </div>
                <div class="form-group">
                  <label for="genero">Género:</label>
                  <input type="text" v-model="formData.gender" required />
                </div>
                <div class="form-group">
                  <label for="estado">Estado:</label>
                  <input
                    type="text"
                    v-model="formData.status"
                    required
                    disabled
                    style="background-color: #0000002a"
                  />
                </div>
                <div class="form-group">
                  <label for="foto">Foto:</label>
                  <input type="text" v-model="formData.photo" />
                </div>
                <div class="button-container">
                  <button type="submit">Guardar</button>
                </div>
              </form>
            </MyModal>

            <!-- Modal Editar Manager -->
            <MyModal :isVisible="showEditModal" @close="closeModals">
              <form @submit.prevent="handleEdit">
                <h2>Editar Manager</h2>
                <div class="form-group">
                  <label for="edit-nombre">Nombres:</label>
                  <input
                    type="text"
                    id="edit-nombre"
                    v-model="editFormData.firstName"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="edit-apellido">Apellidos:</label>
                  <input
                    type="text"
                    id="edit-apellido"
                    v-model="editFormData.lastName"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="edit-correo">Correo:</label>
                  <input
                    type="email"
                    id="edit-correo"
                    v-model="editFormData.email"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="edit-genero">Género:</label>
                  <input
                    type="text"
                    id="edit-genero"
                    v-model="editFormData.gender"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="estado">Estado:</label>
                  <input
                    type="text"
                    v-model="editFormData.status"
                    required
                    disabled
                    style="background-color: #0000002a"
                  />
                </div>
                <div class="form-group">
                  <label for="edit-foto">Foto:</label>
                  <input type="text" id="edit-foto" v-model="editFormData.photo" />
                </div>
                <div class="button-container">
                  <button type="submit">Guardar Cambios</button>
                </div>
              </form>
            </MyModal>
          </div>
        </div>
      </div>

      <!-- Botones para exportar y buscar -->
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

      <!-- Tabla de Managers -->
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th><div class="cell">#</div></th>
              <th><div class="cell">Foto</div></th>
              <th><div class="cell">Apellidos</div></th>
              <th><div class="cell">Nombres</div></th>
              <th><div class="cell">Correo</div></th>
              <th><div class="cell">Género</div></th>
              <th><div class="cell">Estado</div></th>
              <th><div class="cell">Acciones</div></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="index">
              <td>
                <div class="cell">{{ index + 1 }}</div>
              </td>
              <td>
                <div class="cell">
                  <img :src="user.photo" alt="" class="user-photo" />
                </div>
              </td>
              <td>
                <div class="cell">{{ user.lastName }}</div>
              </td>
              <td>
                <div class="cell">{{ user.firstName }}</div>
              </td>
              <td>
                <div class="cell">{{ user.email }}</div>
              </td>
              <td>
                <div class="cell">{{ user.gender }}</div>
              </td>
              <td>
                <span
                  :class="{
                    'status-active': user.status === 'Activo',
                    'status-inactive': user.status === 'Inactivo',
                  }"
                  >{{ user.status }}</span
                >
              </td>
              <td>
                <button class="btn view-btn" @click="viewUser(user)">
                  <i class="bx bx-show"></i>
                </button>
                <button class="btn edit-btn" @click="editUser(user)">
                  <i class="bx bx-edit"></i>
                </button>
                <button
                  class="btn delete-btn"
                  v-if="user.status === 'Activo'"
                  @click="deleteUser(user)"
                >
                  <i class="bx bx-trash"></i>
                </button>
                <button class="btn restore-btn" v-else @click="restoreUser(user)">
                  <i class="bx bx-undo"></i>
                </button>
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
      showEditModal: false,
      searchQuery: "",
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        status: "Activo",
        photo: "path/to/default/photo.png", // Ejemplo de valor por defecto para la foto
      },
      editFormData: {}, // Para almacenar los datos del manager que se está editando
      users: [
        {
          firstName: "John",
          lastName: "Doe",
          email: "Alexander@ya.ed",
          gender: "Masculino",
          status: "Activo",
          photo: "https://i.pinimg.com/736x/a2/56/51/a256518753a01a4fe95d1bfd35b63317.jpg",
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "Alexander@ya.ed",
          gender: "Femenino",
          status: "Inactivo",
          photo: "https://i.pinimg.com/736x/a2/56/51/a256518753a01a4fe95d1bfd35b63317.jpg",
        },
        {
          firstName: "Alexander",
          lastName: "Narvaez",
          email: "Alexander@ya.ed",
          gender: "Masculino",
          status: "Activo",
          photo: "https://i.pinimg.com/736x/a2/56/51/a256518753a01a4fe95d1bfd35b63317.jpg",
        },
      ],
    };
  },
  computed: {
    filteredUsers() {
      const query = this.searchQuery.toLowerCase();
      return this.users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.gender.toLowerCase().includes(query) ||
          user.status.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    handleCreate() {
      const newUser = { ...this.formData };
      this.users.push(newUser);
      this.showCreateModal = false;
      this.resetFormData();
      Swal.fire({
        title: "¡Manager creado!",
        text: "El nuevo manager ha sido creado con éxito.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    handleEdit() {
      // Encontrar el usuario en el array y actualizar sus datos
      const index = this.users.findIndex(
        (user) => user.email === this.editFormData.email
      );
      if (index !== -1) {
        this.users[index] = { ...this.editFormData };
        this.showEditModal = false;
        this.editFormData = {};
        Swal.fire({
          title: "¡Manager editado!",
          text: "Los cambios han sido guardados exitosamente.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    },
    editUser(user) {
      // Mostrar el modal de edición y cargar los datos del usuario seleccionado
      this.editFormData = { ...user };
      this.showEditModal = true;
    },
    deleteUser(user) {
      // Cambiar el estado del usuario a "Inactivo"
      user.status = "Inactivo";
      Swal.fire({
        title: "¡Manager eliminado!",
        text: "El manager ha sido movido a la lista de Inactivos.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    restoreUser(user) {
      // Restaurar el estado del usuario a "Activo"
      user.status = "Activo";
      Swal.fire({
        title: "¡Manager restaurado!",
        text: "El manager ha sido movido a la lista de Activos.",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
    closeModals() {
      // Cerrar todos los modales y limpiar datos de edición
      this.showCreateModal = false;
      this.showEditModal = false;
      this.resetFormData();
      this.editFormData = {};
    },
    resetFormData() {
      // Reiniciar los datos del formulario de creación
      this.formData = {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        status: "Activo",
        photo: "path/to/default/photo.png",
      };
    },
    viewUser(user) {
      Swal.fire({
        title: "Detalles del Manager",
        html: `
          <div class="modal-details">
            <p><strong>Nombres:</strong> ${user.firstName}</p>
            <p><strong>Apellidos:</strong> ${user.lastName}</p>
            <p><strong>Correo:</strong> ${user.email}</p>
            <p><strong>Género:</strong> ${user.gender}</p>
            <p><strong>Estado:</strong> ${user.status}</p>
            <img src="${user.photo}" alt="Foto del Manager" class="modal-photo">
          </div>
        `,
        confirmButtonText: "OK",
      });
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

/* Estilos para la tabla */
.table-container {
  padding: 20px;
  background-color: aliceblue;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  margin-top: 20px; /*con esto  puedo   bajar mas la tabla   para que haya espacio  entre el modal de crear y el cuadro */
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
  box-shadow:  2px 2px 2px 2px rgba(0, 0, 0, 0.137);

}

.edit-btn {
  background-color: #ffc107;
  color: #fff;
  box-shadow:  2px 2px 2px 2px rgba(0, 0, 0, 0.137);

}

.delete-btn {
  background-color: #dc3545;
  color: #fff;
    box-shadow:  2px 2px 2px 2px rgba(0, 0, 0, 0.137);

}

.restore-btn {
  background-color: #17a2b8;
  color: #fff;
    box-shadow:  2px 2px 2px 2px rgba(0, 0, 0, 0.137);

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
  box-shadow:  2px 2px 2px 2px rgba(0, 0, 0, 0.137);

}

.excel {
  background-color: #28a745;
  color: #fff;
  margin-left: 10px;
  box-shadow:  2px 2px 2px 2px rgba(0, 0, 0, 0.137);

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
.image-preview {
  margin: 80px;
}
.image-preview img {
  max-width: 50%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
}
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


.buscar {
}
</style>
