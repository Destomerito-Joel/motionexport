<template>
  <div class="relative">
    <!-- Page Loader -->
    <PageLoader />

    <!-- Background Section -->
    <div class="relative w-full h-[430px] sm:h-[430px] flex flex-col justify-center items-center text-white fade-in">
      <div 
        class="absolute inset-0 bg-cover bg-center overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/50 before:to-blue/20"
        style="background-image: url(/images/transport.jpg);">
      </div>
      <h1 class="relative mx-auto font-semibold sm:font-bold sm:text-xl md:text-4xl sm:mt-28 fade-in">
        WELCOME TO MOTION EXPRESS WAY
      </h1>
      <p class="relative mx-auto sm:font-semibold text-sm fade-in" data-delay="0.3">
        Unbeatable Tracking and Shipment Service
      </p>
    </div>

    <!-- Other Sections -->
    <div class="absolute w-full top-[240px] sm:top-[300px] left-0 flex justify-center z-10 fade-in" data-delay="0.6">
      <Tracking />
    </div>
    
    <div class="w-full fade-in  py-4" data-delay="0.9">
      <frightCard class="z-30" />
    </div>
    
    <div class=" fade-in" data-delay="1.2">
      <Aboutus />
    </div>
    
    <div class="w-full  bg-blue-500 pt-2 fade-in" data-delay="1.5">
      <div class="w-full px-9 mt-5">
        <h1 class="text-gray-100 text-xl font-bold sm:text-2xl md:text-3xl">HOW IT WORKS</h1>
        <h2 class="font-semibold text-sm mt-2 sm:text-2xl md:text-3xl text-gray-50">
          The fastest, most affordable way to ship products to your customers
        </h2>
      </div>
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
