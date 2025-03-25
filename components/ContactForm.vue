<template>
    <div class="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white p-6 lg:p-12">
      <!-- Contact Info -->
      <div class="w-full lg:w-1/3 space-y-6">
        <h2 class="text-3xl font-bold text-gray-800 animate-fadeIn">Get In Touch With Us</h2>
   
        <div class="space-y-4">
          <div class="flex items-center gap-4 animate-fadeIn delay-300">

          </div>
          <div class="flex items-center gap-4 animate-fadeIn delay-400">
            <span class="text-blue-500 text-xl">📞</span>
            <p>(+62)81 414 257 9980</p>
          </div>
          <div class="flex items-center gap-4 animate-fadeIn delay-500">
            <span class="text-blue-500 text-xl">📧</span>
            <p>support@motionexpressway.com</p>
          </div>
        </div>
      </div>
  
      <!-- Contact Form -->
      <form class="w-full lg:w-2/3  p-6  animate-slideInRight">
        <input type="text" placeholder="Your Name" class="input-field ">
        <input type="email" placeholder="Your Email" class="input-field">
        <input type="tel" placeholder="Your Phone" class="input-field">
        <textarea placeholder="Your Message" class="input-field h-32"></textarea>
        <button type="submit" class="bg-blue-700 text-white py-2 px-4 w-full rounded-md mt-4 hover:bg-blue-900 transition-all duration-300">
          Send Message
        </button>
      </form>
    </div>
  </template>
  
  <style scoped>
  /* Tailwind Utility Classes */
  .input-field {
    @apply w-full p-3 border-b bg-transparent border-blue-700  mb-4 focus:outline-none focus:bg-transparent;
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 1s ease-in-out;
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-slideInRight {
    animation: slideInRight 1s ease-in-out;
  }
  </style>
  