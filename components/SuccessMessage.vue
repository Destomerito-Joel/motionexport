<template>
    <div class="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
      <span>Shipment created successfully!</span>
      <button @click="$emit('close')" class="ml-2 text-lg font-bold">×</button>
    </div>
  </template>
  