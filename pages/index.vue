<template>
  <div class=" relative ">
    <!-- Background Section -->
    <div class="relative w-full h-[360px] sm:h-[430px] flex flex-col justify-center items-center text-white">
      <!-- Background Image with Overlay -->
      <div 
        class="absolute inset-0  bg-cover bg-center overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-black/50 before:to-blue/20"
        style="background-image: url(/images/transport.jpg);">
      </div>
      
      <!-- Content -->
      <h1 class="relative mx-auto font-semibold sm:font-bold sm:text-xl md:text-4xl sm:mt-28">
        WELCOME TO MOTION EXPRESS WAY
      </h1>
      <p class="relative mx-auto sm:font-semibold text-sm">
        Unbeatable Tracking and Shipment Service
      </p>
    </div>

    <!-- Tracking Component Overlapping Background -->
    <div class="absolute w-full  top-[240px] sm:top-[300px] left-0 flex justify-center z-10">
      <Tracking class=""/>
    </div>
    
    <!-- Other Content Below -->
    <div class="w-full ">
      <frightCard class=" z-30" />
    </div>
    <div class="mt-24">
      <Aboutus />
    </div>
    <div class="w-full mt-20">
      <div class="w-full px-9 mt-5">
        <h1 class="text-blue-600 text-xl font-bold sm:text-2xl  md:text-3xl">HOW IT WORKS</h1>
        <h2 class="font-semibold text-sm mt-2 sm:text-2xl  md:text-3xl text-gray-600">
          The fastest, most affordable way to ship products to your customers
        </h2>
      </div>
      <swiperCard />
    </div>
    <div>
      <RatingsCard />
    </div>
    <div>
      <TransportService />
      <OurService />
    </div>
    <div>
      <div class="p-7">
        <h1 class="font-semibold text-sm mt-2 sm:text-2xl  md:text-3xl text-gray-800">
          180+ INTEGRATION PARTNERS
        </h1>
        <h1 class="text-xl font-bold sm:text-2xl text-gray-600 md:text-3xl">
          Connect to more carriers and selling channels
        </h1>
        <h1 class="text-xs font-semibold text-gray-400">
          Save time and money when shipping your online orders. Access instant savings of up to 90% from carriers like UPS, USPS, FedEx, DHL Express, GlobalPost, and more!
        </h1>
      </div>
      <InfiniteScroll />
      <ContactForm />
    </div>
  </div>
</template>
