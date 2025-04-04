<template>
  <div class="relative">
    <div 
        class="absolute inset-0 bg-cover bg-left overflow-hidden h-[300px] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/100 before:to-black/20"
        style="background-image: url(/images/about.jpg);">  
      </div>
      <div class="mt-28 ml-4 absolute top-15">
          <h1 class="text-2xl text-white font-semibold">Contact us </h1>
          <div class="flex  text-gray-100 mt-2 gap-2">
            <nuxt-link to="/">Home</nuxt-link>
            /
            <p class=""> About US</p>
          </div>
        </div>
    <div class="w-full pt-80">
      
      <swiperCard />
    </div>

    <div class="">
      <RatingsCard />
    </div>
    <div class="fade-in" data-delay="2.7">
      <ContactForm />
    </div>
  </div>
</template>

<script setup>

</script>

<style  scoped>

</style>