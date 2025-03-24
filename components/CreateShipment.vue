<template>
  <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
    <div class="relative bg-white py-6 px-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-auto">
      <!-- Close Button -->
      <button @click="$emit('close-modal')" class="absolute top-2 right-3 bg-red-500 px-4 py-2 text-white rounded-lg">
        Close
      </button>

      <h2 class="text-lg font-semibold">Create Shipment</h2>
      <hr class="my-3" />

      <!-- Form -->
      <form class="flex flex-col gap-6" @submit.prevent="createShipment">
        <!-- Shipper & Receiver Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ShipmentSection title="Shipper Info" :fields="shipperFields" />
          <ShipmentSection title="Receiver Info" :fields="receiverFields" />
        </div>

        <!-- Shipment Status -->
        <div>
          <label for="status" class="block text-sm font-medium">Select Status</label>
          <select v-model="selectedStatus" id="status" class="input w-64">
            <option disabled value="">Choose a status</option>
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
          <p class="text-sm text-gray-600 mt-1">Selected: {{ selectedStatus }}</p>
        </div>

        <!-- Shipment Image Upload -->
        <div class="mt-4">
          <label class="block text-sm font-medium">Add Images</label>
          <input type="file" ref="fileInput" accept="image/*" multiple @change="handleFileUpload" class="hidden" />
          <button type="button" @click="triggerFileInput" class="input px-3 cursor-pointer">Upload Images</button>

          <div v-if="shipmentImages.length" class="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
            <div v-for="(image, index) in shipmentImages" :key="index" class="relative">
              <img :src="image.preview" alt="Shipment Image" class="border border-gray-300 rounded size-48 object-cover" />
              <button @click="removeImage(index)" class="absolute top-1 left-1 bg-red-700 text-white rounded-full px-2 py-1 text-xs">
                Remove
              </button>
            </div>
          </div>
        </div>

        <!-- Shipment Details -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ShipmentInput v-for="(field, index) in shipmentFields" :key="index" v-model="field.value" v-bind="field" />
        </div>

        <!-- Submit Button -->
        <div class="mt-5 py-2">
          <button :disabled="loading" class="input bg-gray-900 text-white font-semibold flex items-center justify-center w-full">
            <span v-if="loading" class="spinner-border spinner-border-sm mr-2"></span>
            Create Shipment
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import ShipmentInput from "./ShipmentInput.vue";
import ShipmentSection from "./ShipmentSection.vue";

const db = getFirestore(getApp());
const loading = ref(false);

// Status Options
const statuses = ["Processed", "Shipped", "En Route", "Arrived"];
const selectedStatus = ref("");

const shipperFields = ref([
  { placeholder: "Shipper Name", value: "" },
  { placeholder: "Shipper Address", value: "" },
  { placeholder: "Shipper Phone Number", value: "" },
  { placeholder: "Shipper Email", value: "" },
]);

const receiverFields = ref([
  { placeholder: "Receiver Name", value: "" },
  { placeholder: "Receiver Address", value: "" },
  { placeholder: "Receiver Phone Number", value: "" },
  { placeholder: "Receiver Email", value: "" },
]);


// Shipment Fields
const shipmentFields = ref([
  { placeholder: "Origin", value: "" },
  { placeholder: "Carrier", value: "" },
  { placeholder: "Reference No", value: "" },
  { placeholder: "Package", value: "" },
  { placeholder: "Total Freight", value: "" },
  { placeholder: "Expected Delivery Date", type: "datetime-local", value: "" },
  { placeholder: "Weight", value: "" },
  { placeholder: "Departure Date", type: "datetime-local", value: "" },
  { placeholder: "Destination", value: "" },
  { placeholder: "Shipment Mode", value: "" },
  { placeholder: "Payment Mode", value: "" },
]);

// Image Upload Handling
const shipmentImages = ref([]);
const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  files.forEach((file) => {
    shipmentImages.value.push({
      file,
      preview: URL.createObjectURL(file),
    });
  });
};

const removeImage = (index) => {
  shipmentImages.value.splice(index, 1);
};

// Generate Random Tracking ID
const generateTrackingID = () => {
  return "TRK" + Math.floor(1000000000 + Math.random() * 9000000000);
};

// Validate Form
const validateForm = () => {
  if (!selectedStatus.value || shipmentImages.value.length === 0) {
    alert("Please select a status and upload at least one image.");
    return false;
  }
  return true;
};

// Upload to Cloudinary
const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "nft-image");

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/dss5l5svz/image/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(`Cloudinary upload failed: ${response.statusText}`);

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

// Create Shipment Function
const createShipment = async () => {
  if (!validateForm()) return;

  loading.value = true;
  const trackingID = generateTrackingID();

  const shipmentData = {
    trackingID,
    shipper: { ...shipperFields.value },
    receiver: { ...receiverFields.value },
    status: selectedStatus.value,
    shipmentDetails: shipmentFields.value.map((f) => ({
      placeholder: f.placeholder,
      value: f.value || "",
    })),
    shipmentImages: [],
  };

  // Upload Images to Cloudinary
  for (const image of shipmentImages.value) {
    const imageUrl = await uploadImageToCloudinary(image.file);
    if (imageUrl) shipmentData.shipmentImages.push(imageUrl);
  }

  try {
    await addDoc(collection(db, "shipments"), shipmentData);
    alert(`Shipment Created! Tracking ID: ${trackingID}`);
    resetForm();
  } catch (error) {
    console.error("Error creating shipment:", error);
    alert("Error creating shipment. Please try again.");
  } finally {
    loading.value = false;
  }
};

// Reset Form
const resetForm = () => {
  selectedStatus.value = "";
  shipmentImages.value = [];
  shipmentFields.value.forEach((field) => (field.value = ""));
  shipperFields.value = { name: "", address: "", phoneNumber: "", email: "" };
  receiverFields.value = { name: "", address: "", phoneNumber: "", email: "" };
};
</script>

<style scoped>
.input {
  @apply py-3 rounded-lg border border-gray-400 px-3 w-full;
}

.spinner-border {
  @apply border-2 border-transparent border-t-white rounded-full w-4 h-4 animate-spin;
}
</style>
