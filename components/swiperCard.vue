<template>
    <div class="w-full px-6 py-12">
      <!-- Desktop View -->
      <div class="hidden md:grid grid-cols-4 gap-6">
        <FeatureCard
          v-for="(feature, index) in features"
          :key="index"
          :feature="feature"
        />
      </div>
  
      <!-- Mobile View (Slider) -->
      <div class="md:hidden">
        <swiper
          :modules="[SwiperAutoplay, SwiperPagination]"
          :slides-per-view="1"
          :space-between="20"
          :loop="true"
          :autoplay="{ delay: 3000 }"
          :pagination="{ clickable: true }"
        >
          <swiper-slide v-for="(feature, index) in features" :key="index">
            <FeatureCard :feature="feature" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Autoplay as SwiperAutoplay, Pagination as SwiperPagination } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/pagination';
  import FeatureCard from '@/components/FeatureCard.vue';
  
  const features = [
    {
      title: "Ship From All Your Stores with One Login",
      description: "Our 180+ integrations save you hours a month managing and shipping orders from a single app.",
      icon: "👆",
    },
    {
      title: "Automate Repetitive Tasks",
      description: "Reduce human error and create 15x more labels per hour.",
      icon: "⚙️",
    },
    {
      title: "Cut Costs, Not Corners",
      description: "Motion Express Way saved businesses $4M last year by surfacing the best shipping rates.",
      icon: "💲",
    },
    {
      title: "Grow Your Business",
      description: "Customers report scaling operations over 40x with Motion Express Way help.",
      icon: "🚀",
    },
  ];
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  </style>
  