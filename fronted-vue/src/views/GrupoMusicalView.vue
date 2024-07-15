<template>
  <ProtectedNavbar />
  <p>Grupo musical</p>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";

export default {
  name: "grupo",
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
