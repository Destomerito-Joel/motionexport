<template>
  <div
    class="h-full z-50  text-sm flex justify-between bg-gray-900 transition-all duration-300 shadow-gray-400 shadow-sm"
    :class="isOpen ? 'w-28' : 'w-12'"
  >
    <!-- Sidebar Content -->
    <div
      class="w-full font-semibold text-gray-900  relative "
    >
      <!-- <div
        class="items-center justify-center text-xl font-bold mb-4 border-b border-blue-900 flex"
      >
        <img src="/images/logo.png" alt="Logo" class="w-14" />
      </div> -->

      <ul class="flex flex-col w-full items-center justify-center gap-1">
        <nuxt-link to="/admin" class="bg-blue-100 pl-1 rounded-lg w-full">
          <li class="sidebar-item" @click="isOpen = !isOpen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>

            <span v-if="isOpen">Home</span>
          </li>
        </nuxt-link>
        <nuxt-link
          to="/admin/shipments"
          class="bg-blue-100 pl-1 flex justify-center items-center rounded-lg w-full"
        >
          <li class="sidebar-item" @click="isOpen = !isOpen">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>

            <span v-if="isOpen">Shipment</span>
          </li>
        </nuxt-link>

        

        <!-- Gallery (Emit Event) -->
      </ul>

      <!-- Toggle Button -->
      <div class="absolute -right-2 top-40 z-50">
        <button
          @click="isOpen = !isOpen"
          class="text-sm text-gray-50 font-bold rounded-full bg-blue-900 flex items-center p-1 justify-center"
        >
          <svg
            v-if="isOpen"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-4 "
          >
            <path
              fill-rule="evenodd"
              d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-4"
          >
            <path
              fill-rule="evenodd"
              d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
    <!-- Logout -->
    <div class="logout-item bg-blue-900 text-white mt-80 hover:bg-blue-950">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-6 mt"
      >
        <path
          fill-rule="evenodd"
          d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>

      <span v-if="isOpen">Logout</span>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from "vue";

const isOpen = ref(false);
const emit = defineEmits(["open-modal"]);

const openGallery = () => {
  emit("open-modal");
};
</script>

<style scoped>
.sidebar-item {
  @apply w-full  py-3 flex items-center px-2 gap-2 cursor-pointer transition-all duration-300;
}
.logout-item {
  @apply py-3 rounded-lg flex items-center px-2 gap-2 cursor-pointer transition-all duration-300;
}
</style>
