<template>
    <div class="min-h-screen bg-gray-100 mt-20">
      <div class="container mx-auto px-6 lg:px-20 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Left Side: Info Section -->
          <div>
            <h2 class="text-2xl font-semibold">
              Have a question about <span class="text-blue-500">Motion Express Way?</span>
            </h2>
            <p class="mt-2 text-lg text-gray-700 font-bold">We're here to help.</p>
            <p class="mt-4 text-gray-600">
              Motion Express Way is the leading Cloud & Delivery Experience platform.
              If you need support, feel free to contact us.
            </p>
            <div class="mt-6">
              <p class="text-gray-700 font-semibold flex items-center">
                📞 Call us at: <span class="ml-2 text-blue-500">+1-800-555-1234</span>
              </p>
              <p class="mt-2 text-gray-700 font-semibold flex items-center">
                📧 Email us: <a href="mailto:support@motionexpressway.com" class="ml-2 text-blue-500">support@motionexpressway.com</a>
              </p>
            </div>
            <!-- Logos -->
          </div>
  
          <!-- Right Side: Contact Form -->
          <div class="bg-white p-8 shadow-md rounded-lg">
            <h3 class="text-xl font-semibold text-gray-800">Talk to an expert</h3>
            <form @submit.prevent="submitForm" class="mt-6 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" v-model="form.firstName" placeholder="First Name" class="input-field" />
                <input type="text" v-model="form.lastName" placeholder="Last Name" class="input-field" />
              </div>
              <input type="email" v-model="form.email" placeholder="Contact Email" class="input-field" />
              <input type="text" v-model="form.company" placeholder="Company Name" class="input-field" />
              <textarea v-model="form.message" placeholder="Your Message" class="input-field h-24"></textarea>
              <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md">
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
    @apply w-full p-3 border-b bg-transparent border-teal-700  mb-4 focus:outline-none focus:bg-transparent;
  }
  </style>
  