<template>
    <section class="py-12 ">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-8">
          Powering shipping success at all sizes
        </h2>
  
        <swiper
          :modules="[Navigation, Pagination]"
          :slides-per-view="1"
          :space-between="20"
          :breakpoints="{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }"
          :navigation="true"
          :pagination="{ clickable: true }"
          class="pb-10"
        >
          <swiper-slide v-for="(testimonial, index) in testimonials" :key="index">
            <div class="bg-blue-900 text-white rounded-lg overflow-hidden shadow-md">
              <img :src="testimonial.image" class="w-full h-48 object-cover" alt="testimonial image" />
              <div class="p-6">
                <h3 class="text-lg font-semibold">{{ testimonial.title }}</h3>
                <p class="text-sm mt-2">{{ testimonial.description }}</p>
                <button class="mt-4 px-4 py-2 border border-white rounded-lg text-sm">
                  Read More
                </button>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Navigation, Pagination } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/navigation";
  import "swiper/css/pagination";
  
  const testimonials = [
    {
      title: "Henry’s House of Coffee",
      description: "The foundation of Henry’s House of Coffee is built upon three generations of coffee roasters...",
      image: "https://images.pexels.com/photos/5990037/pexels-photo-5990037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Replace with actual image URL
    },
    {
      title: "Wondercide",
      description: "Shark Tank alum Wondercide experiences 10X growth over decade-long partnership...",
      image: "https://images.pexels.com/photos/7433853/pexels-photo-7433853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "CLEAN Cause",
      description: "Since we started using MotionExpress, our growth of sales in the last three years has been 318%...",
      image: "https://images.pexels.com/photos/8190816/pexels-photo-8190816.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      title: "Spigen",
      description: "Spigen is a leader in the smartphone industry. With MotionExpress...",
      image: "https://images.pexels.com/photos/7793142/pexels-photo-7793142.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];
  </script>
  
  <style>
  /* Optional custom styles */
  </style>
  