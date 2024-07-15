<template>
  <ProtectedNavbar />
  <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dolore optio voluptatum, laboriosam soluta similique cum qui a quis fugiat tempora accusamus enim consequatur animi, eos nostrum eum? Minus, deserunt? album</p>
</template>

<script>
import ProtectedNavbar from "../components/ProtectedNavbar.vue";

export default {
  name: "album",
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
