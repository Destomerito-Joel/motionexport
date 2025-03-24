<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm" v-if="shipment">
    <div class="md:w-3/4 w-full bg-white py-6 px-6 rounded-lg shadow-lg">
      <h2 class="text-lg font-semibold">Edit Shipment</h2>
      <hr class="my-3" />

      <form class="flex flex-col gap-6" @submit.prevent="updateShipment">
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

        <!-- Shipment Details -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ShipmentInput v-for="(field, index) in shipmentFields" :key="index" v-model="field.value" v-bind="field" />
        </div>

        <!-- Submit & Close Buttons -->
        <div class="mt-5 py-2 flex gap-3">
          <button type="submit" class="input bg-gray-900 text-white font-semibold flex items-center justify-center w-full">
            Update Shipment
          </button>
          <button @click="$emit('close')" type="button" class="input bg-red-600 text-white font-semibold w-full">
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
let shipmentId = ref(null);

// Watch for shipment changes and update fields
watch(() => props.shipment, (newShipment) => {
  if (newShipment) {
    shipmentId.value = newShipment.id;
    selectedStatus.value = newShipment.status;
    shipperFields.value = newShipment.shipper;
    receiverFields.value = newShipment.receiver;
    shipmentFields.value = newShipment.shipmentDetails;
  }
}, { immediate: true });

const updateShipment = async () => {
  if (!shipmentId.value) return;

  try {
    await updateDoc(doc(db, "shipments", shipmentId.value), {
      status: selectedStatus.value,
      shipper: shipperFields.value,
      receiver: receiverFields.value,
      shipmentDetails: shipmentFields.value,
    });
    alert("Shipment updated successfully!");
    emit("close"); // Close modal after updating
  } catch (error) {
    console.error("Error updating shipment:", error);
    alert("Error updating shipment. Please try again.");
  }
};
</script>

<style scoped>
.input {
  @apply py-3 rounded-lg border border-gray-400 px-3 w-full;
}
</style>
