<template>
  <div>
    <div class="flex  justify-center items-center">
      <Navbar class="fixed z-30 top-0 mt-3 " />
    </div>
    <div class="font-poppins">
      <slot class="font-poppins" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
// import { onMounted } from 'vue';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';

// onMounted(() => {
//   console.log("Smartsupp script is running...");

//   if (process.client) {
//     window._smartsupp = window._smartsupp || {};
//     window._smartsupp.key = "b7c71abb85c6f6898a3ea4099d4d8b8ce488e2c3"; // Your Smartsupp key

//     const script = document.createElement("script");
//     script.type = "text/javascript";
//     script.async = true;
//     script.src = "https://www.smartsuppchat.com/loader.js";
//     script.onload = () => console.log("Smartsupp loaded on default layout");
//     document.head.appendChild(script);
//   }
// });
</script>

<style scoped>
</style>
