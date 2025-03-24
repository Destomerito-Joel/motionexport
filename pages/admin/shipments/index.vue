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
        class="border rounded-lg w-10/12 h-80 mx-auto md:w-3/4 mt-7 border-gray-800"
      >
        <div class="flex items-center h-1/2">
          <div class="size-40 w-1/2">
            <img
              :src="shipment.shipmentImages[0] || 'default-image.jpg'"
              alt="Shipment"
              class="w-full h-full object-cover p-1"
            />
          </div>
          <div class="flex flex-col px-2 gap-1 text-sm w-1/2">
            <span class="font-bold text-gray-900">{{
              shipment.receiver[0].value
            }}</span>
            <span class="font-semibold text-gray-800">{{
              shipment.receiver[3].value
            }}</span>

            <span class="font-semibold text-gray-800"
              >Tracking ID: {{ shipment.trackingID }}</span
            >
            <span
              class="font-semibold py-1 bg-green-600 w-24 text-sm rounded-3xl pl-3 text-gray-50"
              >{{ shipment.status }}</span
            >
          </div>
        </div>
        <div
          class="flex flex-col px-2 justify-center items-center gap-2 text-white font-semibold w-full h-1/2"
        >
          <NuxtLink
            class="px-2 py-2 flex items-center justify-center bg-gray-900 w-full"
            :to="`/admin/shipments/${shipment.id}`"
          >
            View
          </NuxtLink>
          <button
            @click="confirmDelete(shipment.id)"
            class="px-2 py-2 bg-red-600 w-full"
          >
            Delete
          </button>
          <button
            @click="openEditModal(shipment)"
            class="px-2 py-2 bg-green-900 w-full"
          >
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
            class="px-4 py-2 bg-gray-400 text-white rounded mr-2"
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

// Filter shipments based on search query
const filteredShipments = computed(() => {
  if (!shipments.value.length) return []; // Ensure it's an array before filtering

  return shipments.value.filter((shipment) => {
    if (!shipment.receiver || shipment.receiver.length === 0) return false; // Ensure receiver exists

    return shipment.receiver[0]?.value
      ?.toString()
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
</style>
