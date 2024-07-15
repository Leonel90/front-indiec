<template>
  <ProtectedNavbar />
  <div class="content">
    <div class="header">
      <h1>inicio dahsboard</h1>
    </div>
  </div>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";

export default {
  name: "Dashboard",
  components: {
    ProtectedNavbar,
  },

  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
/*estilos del dasboard*/
</style>
