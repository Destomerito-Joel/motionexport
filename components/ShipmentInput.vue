<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    class="input"
  />
</template>
<script setup>
defineProps({
  modelValue: String,
  placeholder: String,
});
defineEmits(["update:modelValue"]);
</script>
   <style scoped>
   .input {
     @apply py-3 rounded-lg border border-gray-400 px-3 w-full;
   }
   </style>