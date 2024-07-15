<template>
  <ProtectedNavbar />
  <p>Eventos</p>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";

export default {
  name: "Eventos",
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
