<template>
  <div class="flex flex-col sm:flex-row space-y-10 py-10">
    <!-- Phone -->
    <div class="flex items-center space-x-6 ml-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-10 text-green-600"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
        />
      </svg>

      <div>
        <p class="text-gray-500">Call Us Anytime</p>
        <p class=" font-bold text-gray-900">(510) 810-1025</p>
      </div>
    </div>

    <!-- Working Hours -->
    <div class="flex items-center space-x-6 ml-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-10 text-green-600"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      <div>
        <p class="text-gray-500">
          Sunday <span class="text-gray-900 font-semibold">CLOSED</span>
        </p>
        <p class=" font-bold text-gray-900">
          Mon - Sat 9.00am - 18.00pm
        </p>
      </div>
    </div>

    <!-- Location -->
    <div class="flex items-center space-x-6 ml-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-10 text-green-600"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
      </svg>

      <div>
        <p class="text-gray-500">Columbia, SC 29201</p>
        <p class=" font-bold text-gray-900">USA, New York - 10620</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { IconHeadset, IconClock, IconLocation } from "@iconify/vue";
</script>
