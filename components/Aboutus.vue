<template>
   <div class=" bg-white py-10 border border-dotted  border-gray-600">
 
    <div class="flex cont flex-col sm:flex-row mx-auto items-center sm:gap-5 justify-between w-10/12 md:w-2/3 align-center pa-10">
       
        <div class="card-one">
          <div class="image-container">
            <img
              cover
              v-for="(image, index) in images"
              :key="index"
              :src="image"
              alt=""
              class="card-img"
              :class="{ active: currentImage === index }"
            />
          </div>
        </div>
        <hr class="mt-4" />
        <div class="card card-two pl-3 ">
          <div class="text-gray-900 flex flex-col gap-2">
           <h1 class="font font-semibold text-xl sm:text-3xl text-blue-600">About us</h1>
           <p class="text-sm font-semibold text-gray-800 sm:text-2xl">Who we are</p>
           <p class="text-sm text-gray-700 sm:text-xl">We are an international team of over 400,000 shipping professionals, united by a passion for logistics. And we work in a unique environment. Motion Express Ways is as innovative as a start-up, with the power of an international organization.</p>
          </div>
  
        </div>
    </div>
   </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [
        "https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/799091/pexels-photo-799091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/4498136/pexels-photo-4498136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
        currentImage: 0,
      };
    },
    mounted() {
      this.startImageRotation();
    },
    methods: {
      startImageRotation() {
        setInterval(() => {
          this.currentImage = (this.currentImage + 1) % this.images.length;
        }, 3000); // Change image every 3 seconds
      },
    },
  };
  </script>
  
  <style scoped>
  .image-container {
    position: relative;
    width: 100%;
    height: 300px; /* Adjust based on your layout */
    overflow: hidden;
  }
  
  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    transition: opacity 1.5s ease-in-out;
  }
  
  .card-img.active {
    opacity: 1;
    z-index: 2; /* Bring the active image to the front */
  }
  
  .card-one {
    width: 100%;
    height: 100%;
    position: relative;
  }
  
  .card-two {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  

  </style>
  