<template>
    <div  class=" shadow-md hover:shadow-lg transition-shadow overflow-hidden" @click="$emit('click')">
      <img loading="lazy" :src="image" alt="Image" class="w-full h-48 object-cover " />
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    description: String,
    image: String
  });
  </script>
  