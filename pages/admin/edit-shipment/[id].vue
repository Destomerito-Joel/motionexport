<template>
  <main v-if="shipment" class="space-y-6 py-20">
    <h1 class="text-2xl font-bold text-center">Edit Shipment: {{ shipmentId }}</h1>

    <button class="bg-blue-500 text-white px-4 py-2 ml-20 rounded" @click="addBox">Add Box</button>
    <button 
      class="bg-green-500 text-white px-4 py-2 ml-4 rounded flex items-center gap-2" 
      @click="updateShipment"
      :disabled="loading"
    >
      <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
      {{ loading ? "Updating..." : "Update Shipment" }}
    </button>

    <SuccessMessage v-if="showSuccessMessage" @close="showSuccessMessage = false" />

    <div v-for="(box, index) in shipment.boxes" :key="box.id" class="w-full max-w-xl mx-auto border-4 p-4 space-y-6">
      <div class="flex justify-between items-center">
        <input class="border p-2 w-full" placeholder="Title" v-model="box.title" />
        <span class="text-white py-1 cursor-pointer" @click="removeBox(box.id)">❌</span>
      </div>

      <ul class="space-y-4">
        <li v-for="field in box.fields" :key="field.id" class="flex items-center gap-1">
          <div class="grid grid-cols-2 gap-4 flex-1">
            <input class="border p-2 w-full" placeholder="Name" v-model="field.title" />
            <input class="border p-2 w-full" placeholder="Value" v-model="field.value" />
          </div>
          <span @click="removeField(box.id, field.id)">❌</span>
        </li>
      </ul>

      <button class="bg-red-200 px-4 py-2 rounded" @click="addField(box.id)">Add Field</button>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import SuccessMessage from "@/components/SuccessMessage.vue";

definePageMeta({ layout: "dashboard" });

const route = useRoute();
const router = useRouter();
const db = getFirestore(getApp());

const shipmentId = ref(route.params.id);
const shipment = ref(null);
const loading = ref(false);
const showSuccessMessage = ref(false);

onMounted(async () => {
  const shipmentRef = doc(db, "shipments", shipmentId.value);
  const snapshot = await getDoc(shipmentRef);

  if (snapshot.exists()) {
    shipment.value = { id: snapshot.id, ...snapshot.data() };
  } else {
    console.error("Shipment not found");
    router.push("/");
  }
});

const addBox = () => {
  shipment.value.boxes.push({ id: crypto.randomUUID(), title: "", fields: [] });
};

const removeBox = (boxId) => {
  shipment.value.boxes = shipment.value.boxes.filter(box => box.id !== boxId);
};

const addField = (boxId) => {
  const box = shipment.value.boxes.find(b => b.id === boxId);
  if (box) box.fields.push({ id: crypto.randomUUID(), title: "", value: "" });
};

const removeField = (boxId, fieldId) => {
  const box = shipment.value.boxes.find(b => b.id === boxId);
  if (box) box.fields = box.fields.filter(f => f.id !== fieldId);
};

const updateShipment = async () => {
  try {
    loading.value = true;
    const shipmentRef = doc(db, "shipments", shipmentId.value);
    await updateDoc(shipmentRef, { boxes: shipment.value.boxes });
    showSuccessMessage.value = true;
  } catch (error) {
    console.error("Error updating shipment:", error);
  } finally {
    loading.value = false;
  }
};
</script>