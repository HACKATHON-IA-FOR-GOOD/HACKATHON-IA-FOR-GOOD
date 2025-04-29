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
    <div class="question-header">
      <div class="question-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>
      <h2 class="question-text">{{ question }}</h2>
    </div>
    
    <div class="options-container">
      <AnswerOption 
        v-for="(option, index) in options" 
        :key="index"
        :option="option"
        :index="index"
        @select="selectOption(option)"
      />
    </div>
    
    <div class="question-footer">
      <p class="question-tip">Cliquez sur l'option qui vous semble correcte</p>
    </div>
  </div>
</template>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.question-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 0.5rem;
}

.question-icon {
  color: var(--color-primary);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.question-text {
  font-size: 1.4rem;
  color: var(--color-text);
  font-family: 'Poppins', sans-serif;
  line-height: 1.4;
  font-weight: 600;
  margin: 0;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.question-footer {
  border-top: 1px dashed #e0e0e0;
  padding-top: 1rem;
  text-align: center;
}

.question-tip {
  font-size: 0.9rem;
  color: var(--color-grey);
  font-style: italic;
  margin: 0;
}

/* Animation pour les options lorsqu'elles apparaissent */
.options-container > *:nth-child(1) { animation-delay: 0.1s; }
.options-container > *:nth-child(2) { animation-delay: 0.2s; }
.options-container > *:nth-child(3) { animation-delay: 0.3s; }
.options-container > *:nth-child(4) { animation-delay: 0.4s; }
.options-container > *:nth-child(5) { animation-delay: 0.5s; }

@media (max-width: 600px) {
  .question-container {
    gap: 1rem;
  }
  
  .question-text {
    font-size: 1.1rem;
    line-height: 1.3;
  }
  
  .question-header {
    gap: 0.75rem;
    padding-bottom: 0.3rem;
  }
  
  .question-icon {
    display: none;
  }
  
  .options-container {
    gap: 0.6rem;
  }
  
  .question-footer {
    padding-top: 0.7rem;
  }
  
  .question-tip {
    font-size: 0.8rem;
  }
}
</style>