<template>
    <div class="bg-white p-6 rounded-lg shadow-md text-center">
      <div class="text-4xl mb-3">{{ feature.icon }}</div>
      <h3 class="font-bold text-lg">{{ feature.title }}</h3>
      <p class="text-gray-600 text-sm mt-2">{{ feature.description }}</p>
    </div>

  </template>
  
  <script setup>
  defineProps(["feature"]);
  </script>
  