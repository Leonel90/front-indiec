<template>
  <nav class="protected-navbar">
    <div class="navbar-brand">
      <router-link to="#">Logo</router-link>
    </div>
    <div class="navbar-menu">
      <router-link to="/dashboard">Inicio</router-link>
      <router-link to="/perfil">perfil</router-link>

      <router-link to="/genero-musical">Genero musical</router-link>
      <router-link to="/grupo">Grupo musical</router-link>
      <router-link to="/album">Album</router-link>
      <router-link to="/disqueraz">Disqueraz</router-link>
      <router-link to="/maneger">Maneger</router-link>
      <router-link to="/eventos">Eventos</router-link>
      <router-link to="/musica">Musica</router-link>

      <button @click="logout">Cerrar Sesión</button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token"); 
      this.$router.push("/login"); 
    },
  },
};
</script>

<style>
.protected-navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #8678ff;
}

.navbar-menu {
  display: flex;
  gap: 1rem;
  
}
button{
    color:white;
    background-color: #8678ff;
    border-radius: 20px;
}
</style>
