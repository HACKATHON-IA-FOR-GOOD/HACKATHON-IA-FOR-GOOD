<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  option: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['select']);
</script>

<template>
  <button class="answer-option" @click="emit('select')">
    {{ option }}
  </button>
</template>

<style scoped>
.answer-option {
  padding: 1rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background-color: var(--color-background);
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.answer-option:hover {
  background-color: hsla(160, 100%, 37%, 0.1);
  border-color: hsla(160, 100%, 37%, 1);
  transform: translateY(-2px);
}

.answer-option:active {
  transform: translateY(0);
}
</style>