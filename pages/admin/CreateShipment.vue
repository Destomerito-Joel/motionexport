<template>
  <main class="space-y-6 py-20">
    <button class="bg-blue-500 text-white px-4 py-2 ml-20 rounded" @click="addBox">Add Box</button>
    
    <button 
      class="bg-green-500 text-white px-4 py-2 ml-4 rounded flex items-center gap-2" 
      @click="saveToDatabase"
      :disabled="loading"
    >
      <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
      {{ loading ? "Saving..." : "Create Shipment" }}
    </button>

    <SuccessMessage v-if="showSuccessMessage" @close="showSuccessMessage = false" />

    <div v-for="(box, index) in boxes" :key="box.id" class="w-full max-w-xl mx-auto border-4 p-4 space-y-6">
      <div class="flex justify-between items-center">
        <input class="border p-2 w-full" placeholder="Title" v-model="box.title" />
        <span class="text-white py-1 cursor-pointer" @click="removeBox(box.id)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
          </svg>
        </span>
      </div>

      <ul class="space-y-4">
        <li v-for="field in box.fields" :key="field.id" class="flex items-center gap-1">
          <div class="grid grid-cols-2 gap-4 flex-1">
            <input class="border p-2 w-full" placeholder="Name" v-model="field.title" />
            <input class="border p-2 w-full" placeholder="Value" v-model="field.value" />
          </div>
          <span @click="removeFields(box.id, field.id)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
            </svg>
          </span>
        </li>
      </ul>

      <button class="bg-red-200 px-4 py-2 rounded" @click="addFields(box.id)">Add Fields</button>
    </div>
  </main>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import SuccessMessage from "@/components/SuccessMessage.vue"; // Import the success message component

definePageMeta({ layout: "dashboard" });

const db = getFirestore(getApp());
const boxes = ref([]);
const loading = ref(false);
const showSuccessMessage = ref(false);

// Add a new box
const addBox = () => {
  boxes.value.push({
    id: crypto.randomUUID(),
    title: "",
    fields: [],
  });
};

// Remove a box
const removeBox = (boxId) => {
  boxes.value = boxes.value.filter((box) => box.id !== boxId);
};

// Add a new field to a box
const addFields = (boxId) => {
  const box = boxes.value.find((b) => b.id === boxId);
  if (box) {
    box.fields.push({
      id: crypto.randomUUID(),
      title: "",
      value: "",
    });
  }
};

// Remove a field from a box
const removeFields = (boxId, fieldId) => {
  const box = boxes.value.find((b) => b.id === boxId);
  if (box) {
    box.fields = box.fields.filter((field) => field.id !== fieldId);
  }
};

// Save shipment to Firestore
const saveToDatabase = async () => {
  try {
    loading.value = true;
    await nextTick();

    const payload = {
      createdAt: new Date().toISOString(),
      boxes: boxes.value.map((box) => ({
        id: box.id,
        title: box.title.trim() || "Untitled Box",
        fields: box.fields.map((field) => ({
          id: field.id,
          title: field.title.trim() || "Untitled Field",
          value: field.value.trim() || "No Value",
        })),
      })),
    };

    const docRef = await addDoc(collection(db, "shipments"), payload);
    showSuccessMessage.value = true;
  } catch (error) {
    console.error("Error saving data:", error);
  } finally {
    loading.value = false;
  }
};
</script>
