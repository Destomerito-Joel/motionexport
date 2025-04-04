<template>
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
      <span class="block">{{ message }}</span>
    </div>
  </template>
  
  <script setup>
  defineProps({
    message: String
  });
  </script>
  