<template>
        <ProtectedNavbar />
<p>Genero musical</p>
</template>

<script>
import ProtectedNavbar from '../components/ProtectedNavbar.vue';

export default {
  name: 'genero-musical',
  components: {
    ProtectedNavbar
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
};
</script>