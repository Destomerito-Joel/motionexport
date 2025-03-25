<template>
  <div v-if="loading" class="fixed inset-0 bg-gray-100 flex items-center justify-center z-50">
    <div class="grid-loader">
      <div v-for="i in 9" :key="i" class="grid-item"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false; // Hide loader after 2.5 seconds
  }, 2500);
});
</script>

<style scoped>
/* Grid Loader Container */
.grid-loader {
  display: grid;
  grid-template-columns: repeat(3, 20px);
  grid-template-rows: repeat(3, 20px);
  gap: 8px;
  animation: fadeIn 0.5s ease-in-out;
}

/* Individual Grid Items */
.grid-item {
  width: 20px;
  height: 20px;
  background-color: #4A90E2; /* Subtle blue */
  border-radius: 5px; /* Soft rounded corners */
  animation: fade 1.5s infinite ease-in-out;
}

/* Animation Delay for Each Item */
.grid-item:nth-child(1) { animation-delay: 0s; }
.grid-item:nth-child(2) { animation-delay: 0.1s; }
.grid-item:nth-child(3) { animation-delay: 0.2s; }
.grid-item:nth-child(4) { animation-delay: 0.3s; }
.grid-item:nth-child(5) { animation-delay: 0.4s; }
.grid-item:nth-child(6) { animation-delay: 0.5s; }
.grid-item:nth-child(7) { animation-delay: 0.6s; }
.grid-item:nth-child(8) { animation-delay: 0.7s; }
.grid-item:nth-child(9) { animation-delay: 0.8s; }

/* Smooth fade animation for items */
@keyframes fade {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Fade-in Animation for Grid Loader */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
