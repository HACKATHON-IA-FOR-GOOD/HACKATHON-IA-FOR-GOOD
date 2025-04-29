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
    <div class="option-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    </div>
    <span class="option-text">{{ option }}</span>
  </button>
</template>

<style scoped>
.answer-option {
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  border: 2px solid var(--color-grey);
  border-radius: 10px;
  background-color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
  color: var(--color-text);
}

.option-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: var(--color-secondary);
  opacity: 0.7;
  transition: all 0.3s ease;
  width: 24px;
  height: 24px;
}

.option-text {
  flex: 1;
}

.answer-option:hover {
  background-color: rgba(76, 175, 80, 0.1);
  border-color: var(--color-primary);
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.answer-option:hover .option-icon {
  color: var(--color-primary);
  opacity: 1;
}

.answer-option:active {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>