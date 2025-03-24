<template>
  <div class="w-full mt-28 pb-20">
    <!-- Search Bar -->
    <div class="relative flex w-4/5 mx-auto">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Search by name..."
        class="input-field"
      />
      <div class="absolute right-4 mt-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6 text-gray-400"
        >
          <path
            fill-rule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- Shipment Cards -->
    <div class="w-full mt-16">
      <div
        v-if="filteredShipments.length === 0"
        class="text-center text-gray-600 text-lg"
      >
        No shipments found.
      </div>

      <div
        v-for="shipment in filteredShipments"
        :key="shipment.id"
        class="shipment-card"
      >
        <div class="flex items-center h-1/2 p-3">
          <div class="w-36 h-36">
            <img
              :src="shipment.shipmentImages[0] || 'default-image.jpg'"
              alt="Shipment"
              class="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div class="flex flex-col px-3 w-full">
            <span class="font-bold text-gray-900 text-lg">
              {{ shipment.receiver[0].value }}
            </span>
            <span class="font-semibold text-gray-700 text-sm">
              {{ shipment.receiver[3].value }}
            </span>

            <div class="flex items-center gap-2">
              <span class="font-semibold text-gray-800">
                Tracking ID: {{ shipment.trackingID }}
              </span>
              <button
                @click="copyTrackingID(shipment.trackingID)"
                class="text-gray-600 hover:text-gray-800 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
              </button>
              <span
                v-if="copiedTrackingID === shipment.trackingID"
                class="text-green-600 text-sm"
              >
                Copied!
              </span>
            </div>

            <span class="status-badge">
              {{ shipment.status }}
            </span>
          </div>
        </div>

        <div class="button-group">
          <NuxtLink
            class="btn bg-gray-900"
            :to="`/admin/shipments/${shipment.id}`"
          >
            View
          </NuxtLink>
          <button @click="confirmDelete(shipment.id)" class="btn bg-red-600">
            Delete
          </button>
          <button @click="openEditModal(shipment)" class="btn bg-green-900">
            Edit
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Shipment Modal -->
    <editShipment
      v-if="isEditModalOpen"
      :shipment="selectedShipment"
      @close="isEditModalOpen = false"
    />

    <!-- Delete Confirmation Modal -->
    <div
      v-if="isDeleteModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-lg font-bold text-gray-800">Confirm Deletion</h2>
        <p class="text-gray-600">
          Are you sure you want to delete this shipment?
        </p>
        <div class="flex justify-end mt-4">
          <button
            @click="isDeleteModalOpen = false"
            class="px-4 py-2 bg-gray-900 text-white rounded mr-2"
          >
            Cancel
          </button>
          <button
            @click="deleteShipment"
            class="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "dashboard",
});

import editShipment from "@/components/editShipment.vue";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { getApp } from "firebase/app";

const db = getFirestore(getApp());
const shipments = ref([]);
const searchQuery = ref("");
const router = useRouter();
const isEditModalOpen = ref(false);
const selectedShipment = ref(null);
const isDeleteModalOpen = ref(false);
const shipmentToDelete = ref(null);
const copiedTrackingID = ref(null);

// Fetch shipments from Firebase
const fetchShipments = async () => {
  try {
    console.log("Fetching shipments...");
    const querySnapshot = await getDocs(collection(db, "shipments"));

    if (!querySnapshot.empty) {
      shipments.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Shipments:", shipments.value);
    } else {
      console.log("No shipments found in Firestore.");
    }
  } catch (error) {
    console.error("Error fetching shipments:", error);
  }
};

// Copy tracking ID
const copyTrackingID = (trackingID) => {
  navigator.clipboard.writeText(trackingID).then(() => {
    copiedTrackingID.value = trackingID;
    setTimeout(() => (copiedTrackingID.value = null), 2000);
  });
};

// Filter shipments based on search query
const filteredShipments = computed(() => {
  return shipments.value.filter((shipment) => {
    return shipment.receiver[0]?.value
      ?.toLowerCase()
      .includes(searchQuery.value.toLowerCase());
  });
});

// Open delete confirmation modal
const confirmDelete = (id) => {
  shipmentToDelete.value = id;
  isDeleteModalOpen.value = true;
};

// Delete a shipment
const deleteShipment = async () => {
  if (!shipmentToDelete.value) return;
  try {
    await deleteDoc(doc(db, "shipments", shipmentToDelete.value));
    shipments.value = shipments.value.filter(
      (shipment) => shipment.id !== shipmentToDelete.value
    );
    console.log("Shipment deleted:", shipmentToDelete.value);
  } catch (error) {
    console.error("Error deleting shipment:", error);
  } finally {
    isDeleteModalOpen.value = false;
    shipmentToDelete.value = null;
  }
};

// Open edit modal
const openEditModal = (shipment) => {
  selectedShipment.value = shipment;
  isEditModalOpen.value = true;
};

onMounted(fetchShipments);
</script>

<style scoped>
.input-field {
  @apply w-full p-3 border-b bg-transparent border-gray-500 mb-4 focus:outline-none focus:bg-transparent;
}

.shipment-card {
  @apply border rounded-lg w-10/12 md:w-3/4 mx-auto mt-7 border-gray-800 shadow-lg p-4;
}

.status-badge {
  @apply font-semibold py-1 px-3 bg-green-600 text-sm rounded-3xl text-white w-fit;
}

.button-group {
  @apply flex gap-2 p-3;
}

.btn {
  @apply px-4 py-2 w-full text-white font-semibold rounded-lg text-center;
}
</style>
