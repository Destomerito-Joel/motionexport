<template>
  <div class="w-full overflow-hidden bg--950 text-gray-50 py-4">
    <div class="flex space-x-6 animate-scroll">
      <div
        v-for="(company, index) in repeatedCompanies"
        :key="index"
        class="min-w-[150px] flex flex-col items-center p-2"
      >
        <!-- Company Logo -->
        <img :src="company.logo" :alt="company.name" class="h-12 object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// List of shipping companies with their logos
const shippingCompanies = [
  { name: 'A.P. Moller-Maersk Group', logo: 'https://logocreator.io/wp-content/uploads/2023/11/fedex-logo-free-download-free-vector-1.jpg' },
  { name: 'Mediterranean Shipping Company (MSC)', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvWOdkuiSJHAk7sBN1B32m0Mrx2l0Gb51w4Q&s' },
  { name: 'COSCO Shipping', logo: 'https://1000logos.net/wp-content/uploads/2017/06/UPS-logo.jpg' },
  { name: 'Hapag-Lloyd', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvTJOXkHI4R2pOD-Qo2BB8S3N8Xr4hyI4GHM50UagoGcMCRWG7ylUq2G56XeAPjIHF4TA&usqp=CAU' },
  { name: 'Evergreen Marine Corporation', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsj1X8VWvtyl7PwK6kDtZQWX1LqpCMyCIe1A&s' },
  { name: 'Ocean Network Express (ONE)', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbzDwpBUaHmi7b0ZgHayG2zFnjSbRDNyuvZw&s' },
  { name: 'Hyundai Merchant Marine (HMM)', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6fB1ShB6wCDu8DVRQiXGURqwCLQqxCIysFg&s' },
  { name: 'Yang Ming Marine Transport Corporation', logo: 'https://www.hrkatha.com/wp-content/uploads/2023/06/Strike.png' },
  { name: 'Wan Hai Lines', logo: 'https://cdn.prod.website-files.com/6491ba3385a673a232da1dfb/66c5b11458983b3139dd5a48_wan-hai-logo.jpg' }
];

// Duplicate for smooth infinite scrolling
const repeatedCompanies = computed(() => [...shippingCompanies, ...shippingCompanies]);
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  display: flex;
  width: max-content;
  animation: scroll 15s linear infinite;
}
</style>
