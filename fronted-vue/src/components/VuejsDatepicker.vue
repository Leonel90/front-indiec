<template>
  <div class="form-group">
    <label for="artistName">Fecha:</label>
    <vuejs-datepicker v-model="formData.artistName"></vuejs-datepicker>
  </div>
</template>

<script>
import VuejsDatepicker from "vuejs-datepicker";

export default {
  components: {
    VuejsDatepicker,
  },
  data() {
    return {
      formData: {
        artistName: "",
      },
    };
  },
};
</script>

<style scoped>
/* Aquí puedes agregar estilos personalizados si es necesario */
</style>
