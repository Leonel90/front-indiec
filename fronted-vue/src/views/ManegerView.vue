<template>
  <div>
    <ProtectedNavbar />
    <!-- Modal Crear Manager -->
    <div class="content">
      <div class="header">
        <div id="capa-padre">
          <h1>Maneger</h1>
          <div id="app">
            <button @click="showCreateModal = true">Crear Manager</button>
            <MyModal :isVisible="showCreateModal" @close="showCreateModal = false">
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
                <div class="button-container">
                  <button type="submit">Guardar</button>
                </div>

              </form>
            </MyModal>
          </div>
        </div>
      </div>

         <!-- Carpetas -->
     <div class="pdf">
      <div>PDF</div>
     </div>
     <div class="excel"> 
      <div>EXCEL</div>
     </div>
      <!-- Barra de busqueda  -->
      <div class="buscar">
      <div>Buscar</div>
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
              <th><div class="cell">Email</div></th>
              <th><div class="cell">Género</div></th>
              <th><div class="cell">Estado</div></th>
              <th><div class="cell">Acciones</div></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td>
                <div class="cell">{{ index + 1 }}</div>
              </td>
              <td>
                <div class="cell">
                  <img :src="user.photo" alt="Foto" class="user-photo" />
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
                    'status-inactive': user.status === 'Eliminado',
                  }"
                  >{{ user.status }}</span
                >
              </td>
              <td>
                <button class="btn view-btn" @click="viewUser(user)">Ver</button>
                <button class="btn edit-btn" @click="editUser(user)">Editar</button>
                <button
                  class="btn delete-btn"
                  v-if="user.status === 'Activo'"
                  @click="deleteUser(user)"
                >
                  Eliminar
                </button>
                <button class="btn restore-btn" v-else @click="restoreUser(user)">
                  Restaurar
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
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        status: "Activo",
      },
      users: [
        {
          photo: "path/to/photo1.png",
          lastName: "Narvaez",
          firstName: "Alexander",
          email: "Alexander@ya.ed",
          gender: "Masculino",
          status: "Activo",
        },
        {
          photo: "path/to/photo2.png",
          lastName: "Narvaez",
          firstName: "Alexander",
          email: "Alexander@ya.ed",
          gender: "Masculino",
          status: "Activo",
        },
        {
          photo: "path/to/photo3.png",
          lastName: "Narvaez",
          firstName: "Alexander",
          email: "Alexander@ya.ed",
          gender: "Masculino",
          status: "Eliminado",
        },
        {
          photo: "path/to/photo4.png",
          lastName: "Narvaez",
          firstName: "Alexander",
          email: "Alexander@ya.ed",
          gender: "Masculino",
          status: "Activo",
        },
        {
          photo: "path/to/photo5.png",
          lastName: "Narvaez",
          firstName: "Alexander",
          email: "Alexander@ya.ed",
          gender: "Masculino",
          status: "Activo",
        },
        {
          photo: "path/to/photo6.png",
          lastName: "Narvaez",
          firstName: "Alexander",
          email: "Alexander@ya.ed",
          gender: "Masculino",
          status: "Activo",
        },
      ],
    };
  },
  methods: {
    handleCreate() {
      const newUser = { ...this.formData, photo: "path/to/default/photo.png" };
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
    viewUser(user) {
      Swal.fire({
        title: "Información del Manager",
        html: `
          <p><strong>Nombre:</strong> ${user.firstName} ${user.lastName}</p>
          <p><strong>Correo:</strong> ${user.email}</p>
          <p><strong>Género:</strong> ${user.gender}</p>
          <p><strong>Estado:</strong> ${user.status}</p>
        `,
        icon: "info",
        confirmButtonText: "OK",
      });
    },
    editUser(user) {
      this.formData = { ...user };
      this.showCreateModal = true;
    },
    deleteUser(user) {
      user.status = "Eliminado";
    },
    restoreUser(user) {
      user.status = "Activo";
    },
    resetFormData() {
      this.formData = {
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        status: "Activo",
      };
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
  font-family: "Times New Roman", Times, serif;
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
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 100px;/*con esto  puedo   bajar mas la tabla   para que haya espacio  entre el modal de crear y el cuadro */



}
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: center;
}

th {
  background-color: #f8f8f8;
  border-radius: 5px;
}

.cell {
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
  display: inline-block;
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
}

.edit-btn {
  background-color: #ffc107;
  color: #fff;
}

.delete-btn {
  background-color: #dc3545;
  color: #fff;
}

.restore-btn {
  background-color: #17a2b8;
  color: #fff;
}

.pdf {
  background-color: #dc3545;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 2px;
  width: 60px;
  position: relative;
  top: 120px;
}
.excel {
  background-color: #28a745;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 2px;
  width: 60px;
  position: relative;
  top: 86px;
  left:70px;
}

.buscar{
  background-color: #ffffff;
  color:black;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  padding: 5px 10px;
  position:relative;
  border: none;
  left:500px;
  top:50px;
  cursor: pointer;
  margin: 0 2px;
  width:380px;
  border-radius:10px;
  text-align: center;

}

/* Estilos de la vista previa de la imagen */
.image-preview {
  margin: 80px;
}
.image-preview img {
  max-width: 100%;
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


</style>
