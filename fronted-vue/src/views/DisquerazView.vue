<template>
  <ProtectedNavbar />
  <p>disqueraz </p>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";

export default {
  name: "disqueraz",
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
