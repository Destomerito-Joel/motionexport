<template>
  <div class="relative">
    <!-- Page Loader -->
    <PageLoader />

    <!-- Background Section -->
    <div class="relative w-full h-screen flex flex-col justify-center items-center text-white fade-in">
      <div 
        class="absolute inset-0 bg-cover bg-center overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/50 before:to-blue/20"
        style="background-image: url(/images/h1_hero.jpg);">
      </div>
    
    </div>
    <div class=" flex-col w-full absolute top-0  left-0 flex justify-center z-10 fade-in " data-delay="0.6">
      <create />
      <h1 class="text-gray-50 p-4 italic md:pl-56 mt-3">
        FOR ORDER  STATUS INQUIRY
      </h1>
    </div>

    <!-- Other Sections -->
    
    <div class="w-full fade-in  py-4 bg-gray-50" data-delay="0.9">
      <frightCard class="z-30" />
    </div>
    
    <div >
      <Aboutus />
    </div>
    
    <div class="w-full fade-in" data-delay="1.5">
      
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
import PageLoader from "@/components/PageLoader.vue";
import { onMounted } from 'vue';

onMounted(() => {
  const elements = document.querySelectorAll('.fade-in');
  const options = {
    threshold: 0.5, // Trigger when 50% of the element is in view
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-active');
      }
    });
  }, options);

  elements.forEach(el => {
    observer.observe(el);
  });
});
</script>

<style scoped>
/* Fade-in Effect */
.fade-in {
  opacity: 0;
  transform: translateY(30px); /* Slight movement for smooth effect */
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-active {
  opacity: 1;
  transform: translateY(0); /* When in view, element moves to its original position */
}
</style>
