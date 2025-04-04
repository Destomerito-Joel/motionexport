<template>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200 text-left">
            <th v-for="(header, index) in headers" :key="index" class="border p-2">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td
              v-for="(col, colIndex) in row"
              :key="colIndex"
              class="border p-2"
              :colspan="col.colspan || 1"
              :rowspan="col.rowspan || 1"
            >
              {{ col.value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  defineProps({
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  /* Optional: Add more styles if needed */
  </style>
  