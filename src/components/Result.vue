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
  if (percentage.value === 100) return "Parfait ! Vous êtes un véritable locavore éclairé !";
  if (percentage.value >= 80) return "Excellent ! Vous maîtrisez bien les enjeux de l'alimentation locale !";
  if (percentage.value >= 60) return "Bravo ! Votre connaissance de l'alimentation durable est solide !";
  if (percentage.value >= 40) return "Pas mal ! Continuez à explorer les bienfaits des circuits courts !";
  return "Vous avez fait le premier pas ! L'alimentation locale vous réserve encore plein de découvertes !";
});

const impact = computed(() => {
  if (percentage.value >= 80) {
    return "En adoptant une alimentation locale, vous pourriez réduire votre empreinte carbone alimentaire de près de 50% !";
  } else if (percentage.value >= 50) {
    return "Saviez-vous que consommer local peut réduire jusqu'à 7 fois les émissions de CO2 liées au transport des aliments ?";
  } else {
    return "Un panier alimentaire local et de saison émet en moyenne 4 fois moins de CO2 qu'un panier conventionnel !";
  }
});
</script>

<template>
  <div class="result-container animate-fade-in">
    <h2 class="result-title">Quiz terminé !</h2>
    
    <div class="result-card">
      <div class="score-container">
        <div class="score-circle">
          <div class="score-value">{{ score }}</div>
          <div class="score-total">/ {{ total }}</div>
        </div>
        
        <div class="percentage-bar">
          <div class="percentage-fill" :style="{ width: `${percentage}%` }"></div>
        </div>
        <div class="percentage-text">{{ percentage }}%</div>
      </div>
      
      <div class="message">{{ message }}</div>
      
      <div class="impact-card">
        <div class="impact-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path>
          </svg>
        </div>
        <div class="impact-text">{{ impact }}</div>
      </div>
      
      <div class="actions">
        <button class="btn" @click="emit('reset')">
          Recommencer le quiz
        </button>
        
        <button class="btn btn-secondary share-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="share-icon">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          Partager mes résultats
        </button>
      </div>
    </div>
    
    <div class="eco-tip">
      <div class="tip-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </div>
      <p class="tip-text">Conseil du jour : Essayez de trouver un producteur local près de chez vous et achetez directement vos légumes de saison à la ferme. C'est frais, écologique et vous soutenez l'économie locale !</p>
    </div>
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
  color: var(--color-primary);
  font-family: 'Poppins', sans-serif;
  position: relative;
}

.result-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: var(--color-primary);
  border-radius: 2px;
}

.result-card {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
}

.score-container {
  margin-bottom: 2rem;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: white;
  border: 8px solid var(--color-primary-light);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 1.5rem;
}

.score-value {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
}

.score-total {
  font-size: 1.2rem;
  color: var(--color-grey);
}

.percentage-bar {
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.percentage-fill {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 5px;
  transition: width 1.5s ease;
}

.percentage-text {
  font-size: 1.5rem;
  color: var(--color-primary);
  font-weight: 600;
  margin-bottom: 1rem;
}

.message {
  font-size: 1.2rem;
  color: var(--color-text);
  font-weight: 500;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.impact-card {
  display: flex;
  align-items: flex-start;
  background-color: #f0f7f0;
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 2rem;
  border-left: 4px solid var(--color-primary);
}

.impact-icon {
  margin-right: 1rem;
  color: var(--color-primary);
  margin-top: 0.2rem;
}

.impact-text {
  flex: 1;
  text-align: left;
  line-height: 1.6;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.share-icon {
  margin-right: 0.5rem;
}

.eco-tip {
  display: flex;
  align-items: flex-start;
  background-color: rgba(141, 110, 99, 0.1);
  border-radius: 8px;
  padding: 1.2rem;
  max-width: 600px;
  border-left: 4px solid var(--color-secondary);
}

.tip-icon {
  margin-right: 1rem;
  color: var(--color-secondary);
  margin-top: 0.2rem;
}

.tip-text {
  flex: 1;
  text-align: left;
  line-height: 1.6;
  font-style: italic;
}

@media (min-width: 768px) {
  .actions {
    flex-direction: row;
    justify-content: center;
  }
}
</style>