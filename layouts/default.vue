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
import { onMounted } from 'vue';
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';

onMounted(() => {
  console.log("Smartsupp script is running...");

  if (process.client) {
    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = '416e5236a98f332fa18865d5423e14e0f5dc5161';

    if (!window.smartsupp) {
      const s = document.getElementsByTagName('script')[0];
      const c = document.createElement('script');
      c.type = 'text/javascript';
      c.charset = 'utf-8';
      c.async = true;
      c.src = 'https://www.smartsuppchat.com/loader.js';
      s.parentNode.insertBefore(c, s);
    }
  }
});

</script>

<style scoped>
</style>
