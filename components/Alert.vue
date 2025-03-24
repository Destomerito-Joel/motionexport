<template>
  <div
    class="flex items-center gap-2 px-2 py-1 text-xs text-teal-800 bg-teal-100 border-2 border-teal-600 rounded-bl-3xl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6 rou"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>

    <span class="text-sm font-medium">{{ message }}</span>
  </div>
</template>

<script setup>
defineProps({
  message: String,
  show: Boolean,
});
</script>
