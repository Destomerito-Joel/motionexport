<template>
  <main class="space-y-8 pt-16  flex flex-col items-center mt-28">
    <h1 class="sm:text-3xl text-2xl px-3 font-extrabold text-white">
      Safe & Reliable <span class="text-green-600">Logistic</span> Solution!
    </h1>

    <!-- Input field for tracking ID -->
    <div class="flex justify-center flex-col sm:flex-row mt-8 w-full max-w-4xl gap-4 sm:gap-0">
      <input 
        v-model="trackingId" 
        class="border-2 border-gray-300 p-3 focus:outline-none mx-auto focus:ring-2 w-11/12 sm:w-4/5 focus:ring-green-500 transition-all"
        placeholder="Your Tracking ID"
      />
      <button 
        @click="trackShipment"
        :disabled="isLoading"
        class="bg-green-600 text-white px-6 py-2 w-11/12 mx-auto font-semibold hover:bg-green-700 transition-all sm:w-auto flex justify-center items-center"
      >
        <span v-if="isLoading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" ></span>
        <span v-else>TRACK & TRACE</span>
      </button>
    </div>

    <!-- Display shipment details -->
    <div v-if="shipmentData" class="w-full max-w-4xl mt-16 space-y-6 bg-white pt-6">
      <div class="w-full px-6 ">
        <h2 class="text-2xl font-semibold text-gray-800 text-center ">Check the Progress of your Deliveries</h2>
      </div>
      <hr class="w-11/12 ml-3">
      <div class="space-y-4 p-6">
        <div v-for="(box, index) in shipmentData.boxes" :key="index" class="border shadow space-y-4 bg-white border-gray-200">
          <div class="w-full p-6 bg-green-800">
            <h3 class="text-2xl font-semibold text-gray-50">{{ box.title }}</h3>
          </div>
          <ul class="space-y-3 p-6">
            <li v-for="(field, fieldIndex) in box.fields" :key="fieldIndex" class="flex justify-between items-center text-gray-700">
              <span class="font-medium">{{ field.title }}:</span>
              <span 
                :class="{
                  'text-yellow-600': field.title && field.title.toLowerCase().includes('tracking no') && field.value.trim() === trackingId.trim(),
                  'text-gray-600': !(field.title && field.title.toLowerCase().includes('tracking no') && field.value.trim() === trackingId.trim())
                }"
              >
                {{ field.value }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Error or Success Message -->
    <div v-if="error" class="mt-6 absolute top-27 right-1" >
      <ErrorComponent :message="error" />
    </div>

    <div v-if="shipmentData && !error" class="mt-6 absolute top-27 right-1">
      <SuccessComponent :message="'Shipment Found!'" />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getApp } from 'firebase/app';

// Import your components
import ErrorComponent from '@/components/ErrorComponent.vue';
import SuccessComponent from '@/components/SuccessComponent.vue';

const db = getFirestore(getApp());

const trackingId = ref('');
const shipmentData = ref(null);
const error = ref('');
const isLoading = ref(false);

const trackShipment = async () => {
  isLoading.value = true;
  error.value = ''; // Reset error at the beginning of the search
  try {
    if (!trackingId.value.trim()) {
      error.value = 'Please enter a tracking ID.';
      shipmentData.value = null;
      setTimeout(() => {
        error.value = ''; // Clear error message after 3 seconds
      }, 3000);
      isLoading.value = false;
      return;
    }

    console.log("🚀 Entered Tracking ID:", trackingId.value);

    const shipmentsRef = collection(db, "shipments");
    const querySnapshot = await getDocs(shipmentsRef);

    let foundShipment = null;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("📦 Checking shipment:", doc.id, data);

      if (data.boxes && Array.isArray(data.boxes)) {
        data.boxes.forEach((box, boxIndex) => {
          console.log(`🔍 Checking Box [${boxIndex}]`);
          
          if (box.fields && Array.isArray(box.fields)) {
            box.fields.forEach((field, fieldIndex) => {
              console.log(`   🏷️ Checking Field [${fieldIndex}] →`, field);

              const fieldTitle = field.title ? field.title.trim().toLowerCase() : "";
              const fieldValue = field.value ? field.value.trim() : "";

              if (fieldTitle.includes("tracking no") && fieldValue === trackingId.value.trim()) {
                console.log("✅ Found tracking number in fields!");
                foundShipment = data;
              }
            });
          }
        });
      }
    });

    if (foundShipment) {
      shipmentData.value = foundShipment;
      error.value = '';
      console.log("🎯 Shipment Found:", foundShipment);
    } else {
      shipmentData.value = null;
      error.value = 'Shipment not found.';
      console.log("❌ No matching shipment.");
      
      // Hide the error message after 3 seconds
      setTimeout(() => {
        error.value = ''; // Clear error message after 3 seconds
      }, 3000);
    }
  } catch (err) {
    error.value = 'An error occurred while tracking the shipment.';
    console.error("🔥 Error:", err);
    
    // Hide the error message after 3 seconds
    setTimeout(() => {
      error.value = ''; // Clear error message after 3 seconds
    }, 3000);
  } finally {
    isLoading.value = false;
  }
};
</script>
