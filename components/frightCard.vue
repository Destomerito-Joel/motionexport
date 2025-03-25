<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 px-2 py-4">
    <div
      v-for="(card, index) in cards"
      :key="card.id"
      class="flex flex-col justify-center items-center py-4 rounded-lg shadow-lg"
    >
      <img
        :src="card.image"
        :alt="card.title"
        class="object-cover rounded-lg size-10 spin"
        :style="{
          animationDelay: `${index * 0.5}s`,
          animationDuration: '1s',
          animationName: animationState ? 'spin' : 'none',
        }"
      />
      <p class="mt-2 text-center text-sm font-medium">{{ card.title }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Card data
const cards = [
  { id: 1, image: "https://www.svgrepo.com/show/493747/plane.svg", title: "Air Fright" },
  { id: 2, image: "https://www.svgrepo.com/show/493745/boat.svg", title: "Sea Fright" },
  { id: 3, image: "https://www.svgrepo.com/show/493751/shuttle.svg", title: "Road Fright" },
  { id: 4, image: "https://www.svgrepo.com/show/493752/stop.svg", title: "Ware Housing" },
];

// Animation state control
const animationState = ref(true);

// Function to restart animation after a delay
const restartAnimation = () => {
  setTimeout(() => {
    animationState.value = false;
    setTimeout(() => {
      animationState.value = true;
    }, 100); // Start animation again after 100ms (or any desired delay)
  }, cards.length * 500 + 1000); // Delay after all images have spun (500ms per image + 1000ms pause)
};

onMounted(() => {
  restartAnimation();
});
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 1s ease-out forwards;
}
</style>
