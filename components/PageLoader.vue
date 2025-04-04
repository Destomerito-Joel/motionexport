<template>
  <div v-if="loading" class="fixed inset-0 bg-white flex items-center justify-center z-50">
    <div class="folding-cube">
      <div class="cube cube1"></div>
      <div class="cube cube2"></div>
      <div class="cube cube4"></div>
      <div class="cube cube3"></div>
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
/* Folding Cube Loader */
.folding-cube {
  width: 40px;
  height: 40px;
  position: relative;
  transform: rotate(45deg);
}

.cube {
  width: 50%;
  height: 50%;
  background-color: rgb(23, 163, 23); /* Subtle blue */
  position: absolute;
  animation: foldCube 2.5s infinite linear;
  transform-origin: 100% 100%;
}

/* Cube Positions */
.cube1 { top: 0; left: 0; animation-delay: 0s; }
.cube2 { top: 0; right: 0; animation-delay: 0.3s; }
.cube3 { bottom: 0; left: 0; animation-delay: 0.6s; }
.cube4 { bottom: 0; right: 0; animation-delay: 0.9s; }

/* Folding Cube Animation */
@keyframes foldCube {
  0%, 10% {
    transform: perspective(140px) rotateX(-180deg);
    opacity: 0;
  }
  25%, 75% {
    transform: perspective(140px) rotateX(0);
    opacity: 1;
  }
  90%, 100% {
    transform: perspective(140px) rotateY(180deg);
    opacity: 0;
  }
}
</style>
