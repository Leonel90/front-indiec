<template>
  <ProtectedNavbar />
  <div class="content">
    <div class="header">
      <h1>perfil artista</h1>
    </div>
  </div>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";

export default {
  name: "pefil-artista",
  components: {
    ProtectedNavbar,
  },
};
</script>

<style>
/*estilos del dasboard*/
</style>
