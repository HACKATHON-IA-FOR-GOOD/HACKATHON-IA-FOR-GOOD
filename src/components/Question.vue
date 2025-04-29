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
}

.question-text {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-heading);
  text-align: center;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>