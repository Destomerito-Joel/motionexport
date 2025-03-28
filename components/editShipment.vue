<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-4"
    v-if="shipment"
  >
    <div
      class="relative w-full max-w-3xl bg-white py-6 px-6 rounded-lg shadow-lg max-h-[90vh] overflow-auto"
    >
      <h2 class="text-lg font-semibold">Edit Shipment</h2>
      <hr class="my-3" />

      <form class="flex flex-col gap-6" @submit.prevent="updateShipment">
        <!-- Custom Alert -->
        <div
          v-if="showAlert"
          class="fixed top-5 left-1/2 flex transform -translate-x-1/2 bg-blue-500 text-white px-6 justify-center items-center py-2 text-sm rounded shadow-lg transition-opacity duration-500 ease-in-out fade"
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
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          {{ alertMessage }}
        </div>
        <!-- Shipper & Receiver Info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ShipmentSection title="Shipper Info" :fields="shipperFields" />
          <ShipmentSection title="Receiver Info" :fields="receiverFields" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ShipmentSection title="Shipment Location" :fields="locationFields" />
        </div>


        <!-- Shipment Status -->
        <div>
          <label for="status" class="block text-sm font-medium"
            >Select Status</label
          >
          <select v-model="selectedStatus" id="status" class="input w-64">
            <option disabled value="">Choose a status</option>
            <option v-for="status in statuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
          <p class="text-sm text-gray-600 mt-1">
            Selected: {{ selectedStatus }}
          </p>
        </div>

        <div>
          <label for="shipmentInfo" class="block text-sm font-medium"
            >Shipment Info</label
          >
          <textarea
            v-model="shipmentInfo"
            id="shipmentInfo"
            placeholder="Enter shipment details or comments"
            class="input w-full h-24 resize-none"
          ></textarea>
        </div>

        <!-- Shipment Details -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ShipmentInput
            v-for="(field, index) in shipmentFields"
            :key="index"
            v-model="field.value"
            v-bind="field"
          />
        </div>

        <!-- Submit & Close Buttons -->
        <div class="mt-5 py-2 flex gap-3">
          <button
            type="submit"
            class="input bg-gray-900 text-white font-semibold flex items-center justify-center w-full"
          >
            Update Shipment
          </button>
          <button
            @click="$emit('close')"
            type="button"
            class="input bg-red-600 text-white font-semibold w-full"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import ShipmentInput from "./ShipmentInput.vue";
import ShipmentSection from "./ShipmentSection.vue";

const db = getFirestore(getApp());

const props = defineProps({
  shipment: Object, // Receive shipment object from parent
});

const emit = defineEmits(["close"]); // Emit close event to parent

const statuses = ["Processed", "Shipped", "En Route", "Arrived"];
const selectedStatus = ref("");
const shipperFields = ref([]);
const receiverFields = ref([]);
const shipmentFields = ref([]);
const locationFields = ref([]);
const shipmentInfo = ref("");

let shipmentId = ref(null);

// Watch for shipment changes and update fields
watch(
  () => props.shipment,
  (newShipment) => {
    if (newShipment) {
      shipmentId.value = newShipment.id;
      selectedStatus.value = newShipment.status;
      shipperFields.value = newShipment.shipper;
      receiverFields.value = newShipment.receiver;
      locationFields.value = newShipment.location;
      shipmentFields.value = newShipment.shipmentDetails;
      shipmentInfo.value = newShipment.shipmentInfo || ""; // Populate shipment info
    }
  },
  { immediate: true }
);

const updateShipment = async () => {
  if (!shipmentId.value) return;

  try {
    await updateDoc(doc(db, "shipments", shipmentId.value), {
      status: selectedStatus.value,
      shipper: shipperFields.value,
      receiver: receiverFields.value,
      location: locationFields.value,
      shipmentDetails: shipmentFields.value,
      shipmentInfo: shipmentInfo.value, // Include shipment info
    });
    showCustomAlert(`Shipment updated`);
    emit("close"); // Close modal after updating
  } catch (error) {
    console.error("Error updating shipment:", error);
    alert("Error updating shipment. Please try again.");
  }
};

const alertMessage = ref("");
const showAlert = ref(false);

const showCustomAlert = (message) => {
  alertMessage.value = message;
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
  }, 3000); // Alert fades out after 3 seconds
};
</script>

<style scoped>
.input {
  @apply py-3 rounded-lg border border-gray-400 px-3 w-full;
}

.fade {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.fade-leave-active {
  opacity: 0;
}
</style>
