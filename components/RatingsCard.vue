<template>
  <div
    class="w-full px-3 py-12 bg-gradient-to-b from-gray-100 to-white text-center"
  >
    <!-- Title & Description -->
    <h2 class="text-3xl font-bold text-gray-800">Impact you can see</h2>
    <p class="text-gray-600 mt-2">
      We've helped 130,000+ companies improve delivery. Let us improve delivery
      for your business too.
    </p>

    <!-- Awards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mt-8">
      <div
        v-for="(impact, index) in impacts"
        :key="index"
        class="bg-transparent p-6 rounded-lg text-center"
      >
        <img
          :src="impact.image"
          :alt="impact.title"
          class="w-full h-24 object-contain mx-auto"
        />
      </div>
    </div>

    <!-- Ratings Section -->
    <div class="flex flex-wrap justify-center gap-6 mt-8">
      <div
        v-for="(review, index) in reviews"
        :key="index"
        class="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-full"
      >
        <div class="text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <span class="font-semibold">{{ review.rating }}</span>
        <span class="text-gray-600">{{ review.text }}</span>
      </div>
    </div>
    <Testimonials class="w-full"/>
  </div>
</template>

<script setup>
const impacts = [
  {
    title: "Top 100",
    year: "2024",
    image:
      "https://www.shipstation.com/wp-content/uploads/2024/08/Group-18467.png",
  },
  {
    title: "Leader",
    year: "2024",
    image:
      "https://www.shipstation.com/wp-content/uploads/2024/08/Group-18472.png",
  },
  {
    title: "Capterra Shortlist",
    year: "2023",
    image:
      "https://www.shipstation.com/wp-content/uploads/2024/08/Group-18466.png",
  },
  {
    title: "Best ROI",
    year: "Spring 2024",
    image:
      "https://www.shipstation.com/wp-content/uploads/2024/08/Group-18468.png",
  },
  {
    title: "Best Results",
    year: "2024+",
    image:
      "https://www.shipstation.com/wp-content/uploads/2024/08/Group-18464-1.png",
  },
];

const reviews = [
  { rating: 4.9, text: "67 reviews" },
  { rating: 4.6, text: "897 reviews" },
  { rating: 4.3, text: "531 reviews" },
];
</script>
