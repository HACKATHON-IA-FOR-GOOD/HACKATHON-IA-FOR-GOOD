<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue';

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

const nextSteps = ref([
  {
    title: "Trouvez des producteurs locaux",
    description: "Utilisez des applications comme La Ruche Qui Dit Oui ou Locavor pour découvrir les producteurs près de chez vous.",
    icon: "🔍"
  },
  {
    title: "Adoptez le calendrier des saisons",
    description: "Consommer des fruits et légumes de saison réduit l'impact environnemental et améliore la qualité nutritionnelle.",
    icon: "🗓️"
  },
  {
    title: "Partagez avec votre entourage",
    description: "Partagez ce quiz et vos découvertes avec vos proches pour encourager une consommation plus responsable.",
    icon: "👨‍👩‍👧‍👦"
  }
]);

const isSharing = ref(false);
const showConfetti = ref(true);

const share = () => {
  isSharing.value = true;
  
  // Simuler l'action de partage
  setTimeout(() => {
    isSharing.value = false;
    alert("Fonctionnalité de partage simulée : résultat partagé !");
  }, 1500);
};

setTimeout(() => {
  showConfetti.value = false;
}, 3000);
</script>

<template>
  <div class="result-container">
    <div v-if="showConfetti" class="confetti-container">
      <div v-for="n in 20" :key="n" class="confetti" :style="{
        '--delay': `${Math.random() * 3}s`,
        '--left': `${Math.random() * 100}%`,
        '--background': `hsl(${Math.random() * 360}, 80%, 60%)`
      }"></div>
    </div>
    
    <div class="result-header">
      <h2 class="result-title">Quiz terminé !</h2>
      <p class="result-subtitle">Voici votre score et quelques informations sur l'impact de l'alimentation locale</p>
    </div>
    
    <div class="result-content">
      <div class="score-section">
        <div class="score-card">
          <div class="score-circle-container">
            <div class="score-circle">
              <svg viewBox="0 0 36 36" class="score-circle-svg">
                <path class="score-circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path class="score-circle-fill"
                  :stroke-dasharray="`${percentage}, 100`"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" class="score-text">{{ percentage }}%</text>
              </svg>
            </div>
          </div>
          <div class="score-details">
            <div class="score-value-container">
              <span class="score-value">{{ score }}</span>
              <span class="score-total">/ {{ total }}</span>
            </div>
            <p class="score-message">{{ message }}</p>
          </div>
        </div>
      </div>
      
      <div class="impact-section">
        <div class="impact-card">
          <div class="impact-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path>
            </svg>
          </div>
          <div class="impact-content">
            <h3 class="impact-title">Impact environnemental</h3>
            <p class="impact-text">{{ impact }}</p>
          </div>
        </div>
      </div>
      
      <div class="next-steps-section">
        <h3 class="next-steps-title">Prochaines étapes</h3>
        <div class="next-steps-list">
          <div class="next-step-item" v-for="(step, index) in nextSteps" :key="index">
            <div class="step-icon">{{ step.icon }}</div>
            <div class="step-content">
              <h4 class="step-title">{{ step.title }}</h4>
              <p class="step-description">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="actions-section">
        <button class="btn" @click="emit('reset')">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
            <path d="M21 3v5h-5"></path>
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
            <path d="M8 16H3v5"></path>
          </svg>
          Recommencer le quiz
        </button>
        
        <button class="btn btn-secondary share-btn" @click="share" :disabled="isSharing">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          <span v-if="!isSharing">Partager mes résultats</span>
          <span v-else class="sharing-text">
            <span class="sharing-dots"></span>
          </span>
        </button>
      </div>
    </div>
    
    <div class="eco-tip">
      <div class="tip-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </div>
      <div class="tip-content">
        <h4 class="tip-title">Conseil du jour</h4>
        <p class="tip-text">Essayez de trouver un producteur local près de chez vous et achetez directement vos légumes de saison à la ferme. C'est frais, écologique et vous soutenez l'économie locale !</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-container {
  position: relative;
  padding: 1.5rem;
  overflow: hidden;
}

.confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 20px;
  background: var(--background);
  top: -20px;
  left: var(--left);
  opacity: 0.8;
  animation: fall 3s linear forwards;
  animation-delay: var(--delay);
}

@keyframes fall {
  0% { transform: translateY(0) rotate(0); opacity: 1; }
  75% { opacity: 1; }
  100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
}

.result-header {
  text-align: center;
  margin-bottom: 2rem;
}

.result-title {
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.result-subtitle {
  color: var(--color-grey);
  font-size: 1rem;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.score-section {
  margin-bottom: 0.5rem;
}

.score-card {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  gap: 2rem;
}

.score-circle-container {
  position: relative;
  width: 120px;
  height: 120px;
}

.score-circle {
  width: 100%;
  height: 100%;
  position: relative;
}

.score-circle-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.score-circle-bg {
  fill: none;
  stroke: #e0e0e0;
  stroke-width: 3;
}

.score-circle-fill {
  fill: none;
  stroke: var(--color-primary);
  stroke-width: 3;
  transition: stroke-dasharray 1.5s ease;
}

.score-text {
  font-size: 9px;
  font-weight: 700;
  fill: var(--color-primary);
  text-anchor: middle;
  dominant-baseline: middle;
}

.score-details {
  flex: 1;
}

.score-value-container {
  display: flex;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.score-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.score-total {
  font-size: 1.2rem;
  color: var(--color-grey);
  margin-left: 0.25rem;
}

.score-message {
  font-size: 1.2rem;
  color: var(--color-text);
  line-height: 1.4;
}

.impact-card {
  display: flex;
  align-items: flex-start;
  background-color: #f0f7f0;
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid var(--color-primary);
}

.impact-icon {
  margin-right: 1.2rem;
  color: var(--color-primary);
  margin-top: 0.2rem;
}

.impact-content {
  flex: 1;
}

.impact-title {
  font-size: 1.2rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.impact-text {
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.next-steps-section {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.next-steps-title {
  font-size: 1.3rem;
  color: var(--color-text);
  margin-bottom: 1rem;
  text-align: center;
}

.next-steps-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.next-step-item {
  display: flex;
  align-items: flex-start;
  padding: 0.75rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.next-step-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.step-icon {
  font-size: 1.8rem;
  margin-right: 1rem;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.1rem;
  color: var(--color-primary);
  margin-bottom: 0.25rem;
}

.step-description {
  font-size: 0.9rem;
  color: var(--color-text);
  line-height: 1.4;
  margin: 0;
}

.actions-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.5rem;
  font-size: 1rem;
}

.btn-icon {
  flex-shrink: 0;
}

.sharing-text {
  position: relative;
  width: 40px;
  height: 20px;
}

.sharing-dots {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.sharing-dots::before,
.sharing-dots::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
}

.sharing-dots::before {
  left: -12px;
}

.sharing-dots::after {
  right: -12px;
}

.sharing-dots,
.sharing-dots::before,
.sharing-dots::after {
  animation: pulse 1s infinite ease-in-out;
}

.sharing-dots::before {
  animation-delay: -0.2s;
}

.sharing-dots::after {
  animation-delay: 0.2s;
}

.eco-tip {
  display: flex;
  align-items: flex-start;
  background-color: rgba(141, 110, 99, 0.1);
  border-radius: 8px;
  padding: 1.2rem;
  margin-top: 2rem;
  border-left: 4px solid var(--color-secondary);
}

.tip-icon {
  margin-right: 1rem;
  color: var(--color-secondary);
  margin-top: 0.2rem;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
}

.tip-title {
  font-size: 1.1rem;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}

.tip-text {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.6;
}

@keyframes pulse {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

@media (min-width: 768px) {
  .score-card {
    padding: 2rem;
  }
  
  .score-circle-container {
    width: 150px;
    height: 150px;
  }
  
  .actions-section {
    flex-direction: row;
    justify-content: center;
  }
  
  .next-steps-list {
    flex-direction: row;
    gap: 1.5rem;
  }
  
  .next-step-item {
    flex: 1;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;
  }
  
  .step-icon {
    margin-right: 0;
    margin-bottom: 1rem;
    font-size: 2.5rem;
  }
}

/* Améliorations pour mobile */
@media (max-width: 600px) {
  .result-container {
    padding: 1rem;
  }

  .result-title {
    font-size: 1.5rem;
  }

  .result-subtitle {
    font-size: 0.9rem;
  }

  .score-card {
    flex-direction: column;
    padding: 1.25rem;
    gap: 1.5rem;
  }

  .score-circle-container {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }

  .score-value-container {
    justify-content: center;
  }

  .score-message {
    text-align: center;
    font-size: 1.1rem;
  }

  .impact-card {
    flex-direction: column;
    padding: 1.2rem;
    align-items: center;
  }

  .impact-icon {
    margin-right: 0;
    margin-bottom: 0.8rem;
  }

  .impact-title {
    text-align: center;
  }

  .impact-text {
    text-align: center;
  }

  .next-steps-section {
    padding: 1.2rem;
  }

  .next-step-item {
    padding: 1rem 0.8rem;
  }

  .btn {
    width: 100%;
    padding: 0.7rem 1rem;
  }

  .eco-tip {
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .tip-icon {
    margin-right: 0;
    margin-bottom: 0.8rem;
  }

  .tip-title, .tip-text {
    text-align: center;
  }

  .confetti {
    width: 6px;
    height: 12px;
  }
}
</style>