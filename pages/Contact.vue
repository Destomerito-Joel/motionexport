<template>
    <div class="min-h-screen ">
      <div class="container mx-auto px-4 lg:px-20 py-12 relative">

        <div 
        class="absolute inset-0 bg-cover bg-left overflow-hidden h-[300px] before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/100 before:to-black/20"
        style="background-image: url(/images/about.jpg);">  
      </div>
      <div class="mt-28 ml-4 absolute top-15">
          <h1 class="text-2xl text-white font-semibold">Contact us </h1>
          <div class="flex  text-gray-100 mt-2 gap-2">
            <nuxt-link to="/">Home</nuxt-link>
            /
            <p class=""> Contact</p>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2  pt-80">
         
  
          <!-- Right Side: Contact Form -->
          <div class="p-4 ">
            <h3 class="text-xl font-semibold text-gray-800">Talk to an expert</h3>
            <form @submit.prevent="submitForm" class="mt-6  space-y-4 ">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" v-model="form.firstName" placeholder="First Name" class="input-field" />
                <input type="text" v-model="form.lastName" placeholder="Last Name" class="input-field" />
              </div>
              <input type="email" v-model="form.email" placeholder="Contact Email" class="input-field" />
              <input type="text" v-model="form.company" placeholder="Company Name" class="input-field" />
              <textarea v-model="form.message" placeholder="Your Message" class="input-field h-24"></textarea>
              <button type="submit" class="w-full bg-green-600 hover:bg-green-500 text-white py-3 ">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const form = ref({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });
  
  const submitForm = () => {
    console.log("Form Submitted:", form.value);
  };
  </script>
  
  <style scoped>
  .input-field {
    @apply w-full p-3 border-b bg-transparent border-gray-300  mb-4 focus:outline-none focus:bg-transparent rounded-none;
  }
  </style>
  