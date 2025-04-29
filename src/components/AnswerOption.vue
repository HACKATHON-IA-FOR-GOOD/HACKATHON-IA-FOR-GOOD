<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  option: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['select']);

const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
</script>

<template>
  <button class="answer-option animate-fade-in" @click="emit('select')">
    <div class="option-letter">{{ letters[index] }}</div>
    <span class="option-text">{{ option }}</span>
    <div class="option-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h13M12 5l7 7-7 7"></path>
      </svg>
    </div>
  </button>
</template>

<style scoped>
.answer-option {
  display: flex;
  align-items: center;
  padding: 0.9rem 1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: left;
  width: 100%;
  color: var(--color-text);
  position: relative;
  opacity: 0;
  animation: fadeIn 0.4s ease-out forwards;
}

.option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: var(--color-grey);
  font-weight: 600;
  margin-right: 1rem;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.option-text {
  flex: 1;
  font-weight: 400;
  letter-spacing: 0.2px;
}

.option-icon {
  margin-left: 0.5rem;
  color: var(--color-primary);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.answer-option:hover {
  background-color: rgba(76, 175, 80, 0.08);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.answer-option:hover .option-letter {
  background-color: var(--color-primary);
  color: white;
}

.answer-option:hover .option-icon {
  opacity: 1;
  transform: translateX(0);
}

.answer-option:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .answer-option {
    padding: 0.8rem 0.9rem;
  }
  
  .option-letter {
    min-width: 24px;
    height: 24px;
    font-size: 0.9rem;
    margin-right: 0.75rem;
  }
}
</style>