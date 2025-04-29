<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['reset']);

const percentage = computed(() => {
  return Math.round((props.score / props.total) * 100);
});

const message = computed(() => {
  if (percentage.value === 100) return "Parfait ! Félicitations !";
  if (percentage.value >= 80) return "Excellent travail !";
  if (percentage.value >= 60) return "Bien joué !";
  if (percentage.value >= 40) return "Pas mal, continuez à apprendre !";
  return "Continuez à pratiquer, vous pouvez vous améliorer !";
});
</script>

<template>
  <div class="result-container">
    <h2 class="result-title">Quiz terminé !</h2>
    
    <div class="score-container">
      <div class="score">
        <span class="score-value">{{ score }}</span>
        <span class="score-total">/{{ total }}</span>
      </div>
      <div class="percentage">{{ percentage }}%</div>
      <div class="message">{{ message }}</div>
    </div>
    
    <button class="reset-button" @click="emit('reset')">
      Recommencer le quiz
    </button>
  </div>
</template>

<style scoped>
.result-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.result-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-heading);
}

.score-container {
  margin-bottom: 2rem;
}

.score {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.score-value {
  color: hsla(160, 100%, 37%, 1);
  font-weight: bold;
}

.score-total {
  color: var(--color-text);
}

.percentage {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.message {
  font-size: 1.2rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.reset-button {
  padding: 1rem 2rem;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reset-button:hover {
  background-color: hsla(160, 100%, 30%, 1);
}
</style>