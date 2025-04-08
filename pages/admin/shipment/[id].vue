<template>
    <main class="space-y-8 py-16  min-h-screen flex flex-col items-center mt-20">
      <h1 class="text-3xl font-extrabold text-gray-800">Shipment Details</h1>
  
      <!-- Loading Indicator -->
      <div v-if="isLoading" class="text-center">
        <span class="loader"></span>
      </div>
  
      <!-- Shipment Details -->
      <div v-if="shipmentData" class="w-full max-w-4xl mt-16 space-y-6 bg-white pt-6">
        <div class="w-full px-6">
          <h2 class="text-2xl font-semibold text-gray-800 text-center">Check the Progress of Your Deliveries</h2>
        </div>
  
        <div class="space-y-4 py-6 px-4">
          <div v-for="(box, index) in shipmentData.boxes" :key="index" class="border shadow space-y-4 bg-white border-gray-200">
            <div class="w-full p-6 bg-green-800">
              <h3 class="text-xl font-semibold text-gray-50">{{ box.title }}</h3>
            </div>
            <ul class="space-y-3 py-6 px-2">
              <li v-for="(field, fieldIndex) in box.fields"  :key="fieldIndex" class="flex gap-2  text-gray-700">
                <span class="font-medium ">{{ field.title }}:</span>
                <span 
                  class="text-sm"
                  :class="{
                    'text-yellow-600 text-sm': field.title.toLowerCase().includes('tracking no'),
                    'text-gray-600 text-sm': !field.title.toLowerCase().includes('tracking no')
                  }"
                >
                  {{ field.value }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      <!-- Error Message -->
      <div v-if="error" class="mt-6 absolute top-0 right-1">
        <ErrorComponent :message="error" />
      </div>
    </main>
  </template>
  
  <script setup>
  definePageMeta({
  layout: "dashboard",
});
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { getFirestore, doc, getDoc } from 'firebase/firestore';
  import { getApp } from 'firebase/app';
  import ErrorComponent from '@/components/ErrorComponent.vue';
  
  // Firebase setup
  const db = getFirestore(getApp());
  const route = useRoute();
  
  const shipmentData = ref(null);
  const isLoading = ref(true);
  const error = ref('');
  
  // Fetch shipment details
  const fetchShipment = async () => {
    isLoading.value = true;
    error.value = '';
  
    try {
      const shipmentId = route.params.id;
      console.log("Fetching shipment ID:", shipmentId);
  
      const shipmentDoc = await getDoc(doc(db, "shipments", shipmentId));
  
      if (shipmentDoc.exists()) {
        shipmentData.value = shipmentDoc.data();
        console.log("✅ Shipment found:", shipmentData.value);
      } else {
        error.value = "Shipment not found.";
        shipmentData.value = null;
      }
    } catch (err) {
      console.error("🔥 Error fetching shipment:", err);
      error.value = "Failed to load shipment details.";
    } finally {
      isLoading.value = false;
    }
  };
  
  // Fetch on page load
  onMounted(fetchShipment);
  </script>
  
  <style>
  /* Loader */
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #4CAF50;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  