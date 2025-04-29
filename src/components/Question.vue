<script setup>
import { defineProps, defineEmits } from 'vue';
import AnswerOption from './AnswerOption.vue';

const props = defineProps({
  question: {
    type: String,
    required: true
  },
  options: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['select-option']);

const selectOption = (answer) => {
  emit('select-option', answer);
};
</script>

<template>
  <div class="question-container">
    <h2 class="question-text">{{ question }}</h2>
    
    <div class="options-container">
      <AnswerOption 
        v-for="(option, index) in options" 
        :key="index"
        :option="option"
        @select="selectOption(option)"
      />
    </div>
  </div>
</template>

<style scoped>
.question-container {
  margin-bottom: 2rem;
  animation: fadeIn 0.6s ease-out forwards;
}

.question-text {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-text);
  text-align: center;
  font-family: 'Poppins', sans-serif;
  line-height: 1.4;
  position: relative;
  padding-bottom: 1rem;
}

.question-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: 2px;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .question-text {
    font-size: 1.3rem;
  }
}
</style>