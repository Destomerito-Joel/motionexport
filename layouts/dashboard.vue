<template>
  <div>
    <div class="flex bg-white">
      <div class="h-screen">
        <SideBar class="sm:block hidden fixed" />
      </div>
      <div class="w-full sm:pl-12">
        <div class="w-full bg-gray-900 text-white px-10 py-5">
          <h1 class="font-semibold">Admin Dashboard</h1>
        </div>
        <slot />
      </div>
    </div>

    <div>
      <MobileNav 
        class="sm:hidden fixed bottom-0 border pb-2 pt-2 border-gray-900 rounded-md w-full z-30 bg-gray-800" 
        @open-modal="openModal" 
      />
    </div>

    <!-- Floating Button to Open Modal -->
    <nuxt-link to="/admin/CreateShipment">
      <button 
      
      class="bg-blue-700 hidden rounded-full sm:flex justify-center items-center -mt-5 size-12 fixed bottom-8 right-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-8"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
      </svg>
    </button>
    </nuxt-link>

    <!-- Modal (Create Shipment) -->
    <Teleport to="body">
      <div 
        v-if="isModalOpen" 
        class=" "
      >
        <CreateShipment @close-modal="closeModal" />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MobileNav from "@/components/MobileNav.vue";
import SideBar from "@/components/SideBar.vue";
import CreateShipment from "@/components/CreateShipment.vue";

const isModalOpen = ref(false);

const openModal = () => {
  console.log("Opening modal...");
  isModalOpen.value = true;
};

const closeModal = () => {
  console.log("Closing modal...");
  isModalOpen.value = false;
};
</script>
