<template>
  <main class="py-20 bg-white min-h-screen flex flex-col items-center w-full">
    <h1 class="sm:text-3xl text-2xl font-extrabold text-gray-800 mb-6">All Shipments</h1>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[200px]">
      <span class="loader"></span>
    </div>

    <!-- Shipment Grid -->
    <div v-if="shipments.length > 0" class="w-full max-w-6xl grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
      <div v-for="(shipment, index) in shipments" :key="index" class=" p-6 border flex flex-col space-y-4">
        <h2 class="text-lg font-bold text-gray-800">{{ shipment.boxTitle || "No Title" }}</h2>

        <!-- Tracking Number with Copy Button -->
        <div class="flex items-center space-x-2">
          <p class="text-gray-600">
            <span class="text-green-600 font-semibold">
              {{ shipment.trackingNo }}
            </span>
          </p>
          <button v-if="shipment.trackingNo !== 'No Tracking No'" @click="copyToClipboard(shipment.trackingNo)"
            class="bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300 transition text-sm flex items-center">
            📋 Copy
          </button>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-2">
          <NuxtLink :to="`/admin/shipment/${shipment.id}`"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition w-full text-center">
            View
          </NuxtLink>
          <NuxtLink :to="`/admin/edit-shipment/${shipment.id}`"
            class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition w-full text-center">
            Edit
          </NuxtLink>
          <button @click="openDeleteModal(shipment)" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- No Shipments Found -->
    <div v-else-if="!isLoading" class="text-gray-500 mt-4">No shipments found.</div>

    <!-- Error Message -->
    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>

    <!-- Delete Confirmation Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 class="text-xl font-bold text-gray-800">Confirm Deletion</h2>
        <p class="text-gray-600 mt-2">Are you sure you want to delete <span class="font-semibold">{{ selectedShipment.boxTitle }}</span>?</p>

        <div class="flex justify-end space-x-3 mt-4">
          <button @click="isModalOpen = false" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">
            Cancel
          </button>
          <button @click="deleteShipment" :disabled="isDeleting" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            {{ isDeleting ? "Deleting..." : "Delete" }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
definePageMeta({ layout: "dashboard" });

import { ref, onMounted } from "vue";
import { getFirestore, collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getApp } from "firebase/app";

const db = getFirestore(getApp());
const shipments = ref([]);
const isLoading = ref(true);
const error = ref("");
const isModalOpen = ref(false);
const isDeleting = ref(false);
const selectedShipment = ref(null);

// Fetch shipments from Firestore
const fetchShipments = async () => {
  isLoading.value = true;
  shipments.value = [];

  try {
    const shipmentsRef = collection(db, "shipments");
    const querySnapshot = await getDocs(shipmentsRef);

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      if (!data.boxes || !Array.isArray(data.boxes) || data.boxes.length === 0) return;

      let trackingNo = "No Tracking No";
      let boxTitle = data.boxes[0]?.title || "No Title";

      // Search for tracking number in the boxes
      for (const box of data.boxes) {
        if (!box.fields || !Array.isArray(box.fields)) continue;

        const trackingField = box.fields.find((field) =>
          ["tracking", "tracking no", "tracking number"].some((key) =>
            field.title?.toLowerCase().includes(key)
          )
        );

        if (trackingField) {
          trackingNo = trackingField.value;
          break;
        }
      }

      shipments.value.push({ id: doc.id, boxTitle, trackingNo });
    });
  } catch (err) {
    console.error("Error fetching shipments:", err);
    error.value = "Failed to load shipments.";
  } finally {
    isLoading.value = false;
  }
};

// Copy tracking number to clipboard
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    showCopyNotification();  // Call the function to show a notification
  }).catch(() => {
    alert("Failed to copy tracking number.");
  });
};

// Show a notification indicating the number was copied
const showCopyNotification = () => {
  const notification = document.createElement("div");
  notification.textContent = "Tracking number copied!";
  notification.classList.add("notification", "fade-in");

  document.body.appendChild(notification);

  // Remove the notification after 3 seconds
  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => {
      notification.remove();
    }, 500); // Allow time for fade-out animation
  }, 3000);
};

// Open Delete Modal
const openDeleteModal = (shipment) => {
  selectedShipment.value = shipment;
  isModalOpen.value = true;
};

// Delete Shipment
const deleteShipment = async () => {
  if (!selectedShipment.value) return;

  isDeleting.value = true;

  try {
    await deleteDoc(doc(db, "shipments", selectedShipment.value.id));
    shipments.value = shipments.value.filter((s) => s.id !== selectedShipment.value.id);
    alert("Shipment deleted successfully!");
    isModalOpen.value = false;
  } catch (err) {
    console.error("Error deleting shipment:", err);
    error.value = "Failed to delete shipment.";
  } finally {
    isDeleting.value = false;
  }
};

onMounted(fetchShipments);
</script>

<style>
/* Loader Animation */
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4caf50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Notification Styles */
.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

.fade-out {
  animation: fadeOut 0.3s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
