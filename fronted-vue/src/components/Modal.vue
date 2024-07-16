<!-- src/components/Modal.vue -->
<template>
  <div v-if="isVisible" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <span class="close-button" @click="close">&times;</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyModal',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  max-width: 350px;
  width: 100%;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}
</style>
