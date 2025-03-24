<template>
    <footer class="bg-gray-900 text-white py-10">
      <div class="container mx-auto px-6 lg:px-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Left Section: Company Info -->
          <div>
            <h2 class="text-lg font-semibold">Motion Express Ways</h2>
            <p class="mt-3 text-gray-400">
              We are an international team of over 400,000 shipping professionals,
              united by a passion for logistics.
            </p>
            <button class="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
              Contact Us
            </button>
          </div>
  
          <!-- Middle Section: Newsletter -->
          <div>
            <h2 class="text-lg font-semibold">Subscribe to our Newsletter</h2>
            <p class="text-gray-400 mt-2">Get daily updates on Opportunities</p>
            <div class="mt-3 flex">
              <input
                type="email"
                placeholder="Enter Email Address"
                class="w-full p-2 rounded-l bg-gray-800 text-white border border-gray-600 focus:outline-none"
              />
              <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r">
                Subscribe
              </button>
            </div>
          </div>
  
          <!-- Right Section: Contact and Socials -->
          <div class="text-center lg:text-right">
            <p class="text-gray-400">Connect with us</p>
            <p class="text-lg font-semibold mt-2">+121-822-514-60</p>
            <div class="flex justify-center lg:justify-end space-x-4 mt-3">
              <a href="#" class="text-gray-400 hover:text-white text-xl"><i class="fab fa-facebook"></i></a>
              <a href="#" class="text-gray-400 hover:text-white text-xl"><i class="fab fa-twitter"></i></a>
              <a href="#" class="text-gray-400 hover:text-white text-xl"><i class="fab fa-instagram"></i></a>
              <a href="#" class="text-gray-400 hover:text-white text-xl"><i class="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>
  
        <!-- Bottom Links -->
        <div class="mt-10 border-t border-gray-700 pt-6 text-center md:flex md:justify-between">
          <nav class="flex justify-center space-x-6 text-gray-400">
            <a href="/" class="hover:text-white">Home</a>
            <a href="/aboutus" class="hover:text-white">About Us</a>
            <a href="/service" class="hover:text-white">Services</a>
            <a href="/contact" class="hover:text-white">Contact</a>
          </nav>
          <p class="mt-4 md:mt-0 text-gray-400">© 2021 Motionexpressways.online All rights reserved.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* FontAwesome Icons */
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css');
  </style>
  