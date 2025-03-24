<template>
    <div class="">
    <Navbar class="fixed z-30 top-0 w-11/12" />
    <div class=" ">
        <slot />
    </div>
    <Footer />
  </div>
 
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
  export default {
    component:{
      Navbar,
      Footer,
      
    }
  }
</script>

<style scoped>

</style>