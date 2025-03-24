<template>
  <div
    class="flex flex-col fixed top-0 left-0 w-full   overflow-hidden bg-white  "
  >
    <div>
      <div class="w-full px- flex items-center sm:h-24 justify-between">
        <nuxt-link  @click="toggleMenu" to="/">
          <div class="flex items-center text-xl font-bold">
          <div>
            <img src="/images/logo.png" alt="Logo" class="w-16 mt-2 ml-2" />
          </div>
        </div>
        </nuxt-link>

        <!-- Navbar Menu (hidden on desktop) -->
        <div class="mr-5 md:hidden relative">
          <!-- Hamburger icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="text-black size-12"
            v-if="!isOpen"
            :class="{
              'rotate-180': isOpen,
              'transition-transform': true,
              'duration-300': true,
              'ease-in-out': true,
            }"
            @click="toggleMenu"
          >
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clip-rule="evenodd"
            />
          </svg>

          <!-- Close (X) icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-12 text-black "
            v-if="isOpen"
            :class="{
              'rotate-180': !isOpen,
              'transition-transform': true,
              'duration-300': true,
              'ease-in-out': true,
            }"
            @click="toggleMenu"
          >
            <path
              fill-rule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- Desktop Menu (Visible on larger screens) -->
        <div class="md:flex font-semibold gap-16 hidden mr-3">
          <ul class="flex gap-5">
            <NuxtLink to="/" class="text-gray-900 transition"
              >Home</NuxtLink
            >
          
            <NuxtLink to="/aboutus" class="text-gray-900 transition"
              >About Us</NuxtLink
            >

            <NuxtLink to="/service" class="text-gray-900 transition"
              >Services</NuxtLink
            >
            <NuxtLink to="/Contact" class="text-gray-900 transition"
              >Contact</NuxtLink
            >
          </ul>
         
        </div>
      </div>
    </div>
    <div v-if="isOpen" class="flex justify-center items-center">
      <hr class="w-11/12 border border-gray-800 rounded-lg" />
    </div>
    <div class="">
      <!-- Mobile Menu (Slide-Out/Dropdown) -->
      <div v-if="isOpen" class="shadow-sm px-4 py-5 z-30">
        <div class="space-y-4 font-semibold flex flex-col">
          <NuxtLink @click="toggleMenu" to="/" class="text-gray-900 transition"
            >Home</NuxtLink
          >
          <NuxtLink @click="toggleMenu" to="/aboutus" class="text-gray-900 transition"
            >About Us</NuxtLink
          >
          
          <NuxtLink @click="toggleMenu" to="/service" class="text-gray-900 transition"
            >Services</NuxtLink
          >
          <NuxtLink @click="toggleMenu" to="/Contact" class="text-gray-900 transition"
            >Contact</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
/* Optional: Customize your menu styles if needed */
</style>
