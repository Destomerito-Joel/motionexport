<template>
  <div>
    <h3 class="font-semibold">{{ title }}</h3>
    <div class="grid grid-cols-1 gap-3">
      <ShipmentInput
        v-for="(field, index) in fields"
        :key="index"
        v-model="field.value"
        :placeholder="field.placeholder"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  fields: Array,
});
</script>
