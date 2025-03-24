<template>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 px-2 py-4 ">
      <div v-for="card in cards" :key="card.id" class="flex flex-col justify-center items-center rounded-lg shadow-md">
        <img :src="card.image" :alt="card.title" class=" object-cover rounded-lg size-10">
        <p class="mt-2 text-center text-sm font-medium">{{ card.title }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const cards = [
    { id: 1, image: "https://www.svgrepo.com/show/493747/plane.svg", title: "Air Fright" },
    { id: 2, image: "https://www.svgrepo.com/show/493745/boat.svg", title: "Sea Fright" },
    { id: 3, image: "https://www.svgrepo.com/show/493751/shuttle.svg", title: "Road Fright" },
    { id: 4, image: "https://www.svgrepo.com/show/493752/stop.svg", title: "Ware Housing" },
  ];
  </script>
  