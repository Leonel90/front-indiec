<template>
  <div class="dashboard">
    <ProtectedNavbar />
<p>inico admin</p>    
  </div>
</template>

<script>
import ProtectedNavbar from '../components/ProtectedNavbar.vue';

export default {
  name: 'Dashboard',
  components: {
    ProtectedNavbar
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
