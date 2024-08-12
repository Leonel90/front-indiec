<template>
  <div class="layout">
    <nav class="protected-navbar sidebar">
      <div class="navbar-brand profile">
        <router-link to="#">
          <img src="img/logo.png" >
        </router-link>
      </div>
      <hr>
      <div class="navbar-menu">
        <router-link to="/dashboard">
          <i class="bx bx-home"></i> Inicio
        </router-link>

        
        <router-link to="/genero-musical">
          <i class="bx bx-music"></i> Género musical
        </router-link>
        <router-link to="/grupo">
          <i class="bx bx-group"></i> Grupo musical
        </router-link>
        <router-link to="/album">
          <i class="bx bx-album"></i> Álbum
        </router-link>
        <router-link to="/musica">
          <i class="bx bx-music"></i> Música
        </router-link>
        <router-link to="/maneger">
          <i class="bx bx-user-voice"></i> Manager
        </router-link>
        <router-link to="/disqueraz">
          <i class="bx bx-disc"></i> Disquera
        </router-link>
        <router-link to="/eventos">
          <i class="bx bx-calendar"></i> Eventos
        </router-link>
        <hr>
        <button @click="logout">
          <i class="bx bx-log-out"></i> Cerrar Sesión
        </button>
      </div>
    </nav>
  </div>
</template>




<script>
import Swal from 'sweetalert2';

export default {
  methods: {
    logout() {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("token");
          this.$router.push("/");
          Swal.fire('Cerraste sesión', 'Hasta luego Artista!', 'success');
        }
      });
    },
  },
};
</script>

<style >

.sidebar {
  font-family: 'Times New Roman', Times, serif;

    width: 250px;
    background-color: #20252A;
    color: white;
    height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
}

.profile {
  margin:10px;
  text-align: center;
    background-color: #cfcfcf23;
    border-radius:10px;
}

.profile img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background: rgb(168, 168, 168);
}

.navbar-menu {
    list-style-type: none;
    padding: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    color: white;
}

.navbar-menu a {
   text-decoration: none;
    padding: 15px 20px;
    display: block;
    color: white
}


.navbar-menu a:hover,
.navbar-menu button:hover {
    background-color: #34495e;
}

.navbar-menu button {
    background: none;
    border: none;
    color: white;
    text-align: left;
    padding: 10px 20px;
    cursor: pointer;
    width: 100%;
}

.navbar-menu button:focus {
    outline: none;
}

.content {
    margin-left: 250px;
    padding: 20px;
    width: calc(100% - 250px);
}



</style>
