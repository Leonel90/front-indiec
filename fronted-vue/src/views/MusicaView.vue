<template>
  <ProtectedNavbar />
  <p>musica</p>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";

export default {
  name: "Musica",
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
