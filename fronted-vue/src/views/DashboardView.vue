<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>Bienvenido al panel de control.</p>
    <button @click="logout">Cerrar sesión</button>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/Login");
    },
  },
};
</script>

<style>
/*estilos del dasboard*/
</style>
