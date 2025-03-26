<template>
    <div class="bg-gray-100 min-h-screen py-12">
      <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-semibold text-gray-700 text-center mb-6">Shipment Details</h1>
  
        <div v-if="shipmentData" class="space-y-6">
          <!-- Tracking & Status -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="border p-3 rounded-lg">
              <h3 class="text-sm font-semibold text-gray-500 mb-3">Tracking ID</h3>
              <p class="text-sm text-gray-700 font-medium">{{ shipmentData.trackingID || 'N/A' }}</p>
              <hr class="my-4">
              <h3 class="text-sm font-semibold text-gray-500 mb-3">Status</h3>
              <p class="text-xs md:text-sm text-gray-50 bg-green-500 w-20 py-2 pl-3 rounded-3xl font-medium">
                {{ shipmentData.status || 'Pending' }}
              </p>
              <div class="mb-4 mt-2">
            <h3 class="text-sm font-semibold text-gray-600">Shipment Info:</h3>
            <p class="text-gray-700 text-sm">{{ shipmentData.shipmentInfo }}</p>
            <!-- ✅ Show Shipment Info -->
          </div>
            </div>
            <div class="p-3">
              <h3 class="text-sm md:text-xl font-semibold text-gray-500 mb-3">Shipment Dates</h3>
              <p class="text-sm md:text-xl text-gray-700"><strong>Expected Delivery:</strong> {{ shipmentData.expectedDelivery || 'N/A' }}</p>
              <p class="text-sm md:text-xl text-gray-700"><strong>Departure Date:</strong> {{ shipmentData.departureDate || 'N/A' }}</p>
              <p class="text-sm md:text-xl text-gray-700"><strong>Weight:</strong> {{ shipmentData.weight || 'N/A' }} kg</p>
              <p class="text-sm md:text-xl text-gray-700"><strong>Shipment Mode:</strong> {{ shipmentData.mode || 'N/A' }}</p>
            </div>
          </div>
  
          <!-- Shipper & Receiver -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="p-3">
              <h3 class="text-sm md:text-xl font-semibold text-gray-500 mb-3">Shipper Info</h3>
              <p class="text-sm md:text-xl text-gray-700"><strong>Name:</strong> {{ shipmentData.shipper?.[0]?.value || 'N/A' }}</p>
              <p class="text-sm md:text-xl text-gray-700"><strong>Address:</strong> {{ shipmentData.shipper?.[1]?.value || 'N/A' }}</p>
              <p class="text-sm md:text-xl text-gray-700"><strong>Phone:</strong> {{ shipmentData.shipper?.[2]?.value || 'N/A' }}</p>
              <p class="text-sm md:text-xl text-gray-700"><strong>Email:</strong> {{ shipmentData.shipper?.[3]?.value || 'N/A' }}</p>
            </div>
            <div class="p-3">
              <h3 class="text-sm md:text-xl font-semibold text-gray-500 mb-3">Receiver Info</h3>
              <p class="text-sm md:text-xl text-gray-700"><strong>Name:</strong> {{ shipmentData.receiver?.[0]?.value || 'N/A' }}</p>
              <p class="text-sm md:text-xl text-gray-700"><strong>Address:</strong> {{ shipmentData.receiver?.[1]?.value || 'N/A' }}</p>
              <p class="text-sm md:text-xl text-gray-700"><strong>Phone:</strong> {{ shipmentData.receiver?.[2]?.value || 'N/A' }}</p>
              <p class="text-sm md:text-xl text-gray-700"><strong>Email:</strong> {{ shipmentData.receiver?.[3]?.value || 'N/A' }}</p>
            </div>
          </div>
  
          <!-- Shipment Images -->
          <div v-if="shipmentData.shipmentImages?.length">
            <h3 class="text-sm font-semibold text-gray-500 mb-3">Shipment Images</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="(image, index) in shipmentData.shipmentImages" :key="index" class="relative group">
                <img :src="image" alt="Shipment Image" class="size-48 object-cover rounded-lg">
                <a :href="image" target="_blank"
                  class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-semibold transition">
                  View Full Image
                </a>
              </div>
            </div>
          </div>
  
          <!-- Shipment Details -->
          <div>
            <h3 class="text-sm md:text-xl font-semibold text-gray-500 mb-3">Shipment Details</h3>
            <ul v-if="shipmentData.shipmentDetails?.length" class="list-inside list-disc text-gray-700">
              <li v-for="(detail, index) in shipmentData.shipmentDetails" :key="index" class="text-sm">
                <strong>{{ detail.placeholder }}:</strong> {{ detail.value || 'Not Provided' }}
              </li>
            </ul>
            <p v-else class="text-gray-500">No shipment details available.</p>
          </div>
  
          
        </div>
  
        <p v-else class="text-center text-gray-500">Loading shipment details...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
  layout: "dashboard",
});
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { getFirestore, doc, getDoc } from 'firebase/firestore';
  import { getApp } from 'firebase/app';
  
  const db = getFirestore(getApp());
  const route = useRoute();
  const shipmentData = ref(null);
  
  // Fetch shipment details from Firebase
  const fetchShipment = async () => {
  try {
    const shipmentId = route.params.id;
    console.log("Fetching shipment for ID:", shipmentId); // Debugging

    const shipmentRef = doc(db, "shipments", shipmentId);
    const shipmentSnap = await getDoc(shipmentRef);

    if (shipmentSnap.exists()) {
      shipmentData.value = shipmentSnap.data();
      console.log("Fetched Shipment Data:", shipmentData.value); // Debugging
    } else {
      console.error("Shipment not found");
    }
  } catch (error) {
    console.error("Error fetching shipment:", error);
  }
};

  

  
  onMounted(fetchShipment);
  </script>
  