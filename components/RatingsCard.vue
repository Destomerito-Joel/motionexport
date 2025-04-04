<template>
  <div class="relative min-h-screen flex items-center justify-center bg-cover sm:bg-center bg-right py-24 px-3" style="background-image: url('/images/about.jpeg');">
    <div class="bg-gray-50 p-8 md:p-12 lg:p-16 shadow-lg rounded-lg w-full max-w-3xl">
      <p class="text-green-700 font-semibold mt-5">Get A Quote For Free</p>
      <h2 class="text-2xl font-bold text-gray-900 mt-5">Request A Free Quote</h2>
      
      <form class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
        <input type="text" placeholder="Name" class="input-field">
        <input type="email" placeholder="Email" class="input-field">
        <input type="text" placeholder="Contact Number" class="input-field md:col-span-2">
        <select class="input-field md:col-span-2">
          <option >Freight Option</option>
          <option>Air Freight</option>
          <option>Land Freight</option>
          <option>Sea Freight</option>
        </select>
        <input type="text" placeholder="City of Departure" class="input-field">
        <input type="text" placeholder="Incoterms" class="input-field">
        <input type="text" placeholder="Weight" class="input-field">
        <input type="text" placeholder="Height" class="input-field">
        <input type="text" placeholder="Width" class="input-field">
        <input type="text" placeholder="Length" class="input-field">
      </form>
      
      <div class="mt-8">
        <p class="text-sm font-semibold">Extra services:</p>
        <div class="flex flex-wrap gap-8 mt-2 ">
          <label class="flex items-center space-x-2">
            <input type="radio" name="service" class="form-radio text-green-600"> <span>Freight</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="radio" name="service" class="form-radio text-green-600"> <span>Express Delivery</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="radio" name="service" class="form-radio text-green-600"> <span>Insurance</span>
          </label>
          <label class="flex items-center space-x-2">
            <input type="radio" name="service" class="form-radio text-green-600"> <span>Packaging</span>
          </label>
        </div>
      </div>
      
      <button class="mt-8 bg-green-700 text-white py-3 px-6 rounded-lg w-full">REQUEST A QUOTE</button>
    </div>
  </div>
</template>

<style>
.input-field {
  @apply w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600;
}
</style>
