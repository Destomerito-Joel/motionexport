<template>
    <div class="bg-gray-100 py-16">
      <div class="container mx-auto px-6 lg:px-20">
        <h2 class="text-3xl font-bold text-center text-gray-800">Our Expert Services</h2>
        <p class="text-center text-gray-600 mt-2">
          We offer logistics planning for several trucking, shipping, and hauling methods.
        </p>
  
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div v-for="service in services" :key="service.id" class="flex items-start gap-4">
            <div class="text-blue-500 text-2xl">
              <i :class="service.icon"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-gray-800">{{ service.title }}</h3>
              <p class="text-gray-600 text-sm mt-2">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- CTA Section -->
      <div class="bg-gray-900 text-center text-white py-12 mt-16">
        <h2 class="text-2xl font-bold">We Make Transportation Easier, Join Us Today</h2>
       <nuxt-link to="/contact">
        <button class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          Contact Us
        </button>
       </nuxt-link>

      </div>
    </div>
  </template>
  
  <script setup>
  const services = [
    {
      id: 1,
      title: "Freight Shipping",
      icon: "fas fa-truck",
      description: "Transport domestic & international freight through various trucking services."
    },
    {
      id: 2,
      title: "International Export",
      icon: "fas fa-globe",
      description: "We handle the complexities of exporting vehicles, equipment, and paperwork."
    },
    {
      id: 3,
      title: "Heavy Hauling",
      icon: "fas fa-weight-hanging",
      description: "Wide and oversized loads with detailed transport planning and execution."
    },
    {
      id: 4,
      title: "Auto Transportation",
      icon: "fas fa-car",
      description: "Safe vehicle shipping via trailers or drive-away services to any city."
    },
    {
      id: 5,
      title: "Super Load & Bulk Solution",
      icon: "fas fa-boxes",
      description: "Transport large machinery and equipment that can't be broken down."
    },
    {
      id: 6,
      title: "Agriculture Equipment Transport",
      icon: "fas fa-tractor",
      description: "Efficient farm equipment delivery for local and international transport."
    },
    {
      id: 7,
      title: "Power-Only Transportation",
      icon: "fas fa-battery-full",
      description: "Provide your trailer, and we’ll supply the right truck and driver."
    },
    {
      id: 8,
      title: "Drayage Services",
      icon: "fas fa-ship",
      description: "Short-distance transport for small businesses and entrepreneurs."
    }
  ];
  </script>
  
  <style>
  /* Add custom styles if needed */
  </style>
  