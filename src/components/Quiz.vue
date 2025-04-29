<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Question from './Question.vue';
import Result from './Result.vue';
import { generateQuizQuestions, getFallbackQuestions } from '../services/quizApi';

// État du quiz
const questions = ref([]);
const currentQuestionIndex = ref(0);
const userAnswers = ref([]);
const correctAnswers = ref(0);
const incorrectAnswers = ref(0);
const showExplanation = ref(false);
const isLoading = ref(true);
const error = ref(null);
const questionsCompleted = ref(0);
const questionsPerBatch = 10; // Nombre de questions à charger par lot
const preloadThreshold = 3; // Précharger quand il reste ce nombre de questions

// Système de vies
const maxLives = 3;
const lives = ref(maxLives); // 3 vies au départ
const gameOver = ref(false); // Indique si le jeu est terminé

// État de chargement
const loadingProgress = ref(0);
const loadingMessage = ref('Préparation des questions...');
const loadingMessages = [
  'Connexion à l\'IA...',
  'L\'IA réfléchit aux meilleures questions...',
  'Génération de questions pertinentes...',
  'Préparation des explications détaillées...',
  'Finalisation des options de réponse...',
  'Presque prêt !'
];

// Simulation de progression du chargement
function simulateLoadingProgress() {
  let messageIndex = 0;
  loadingProgress.value = 0;
  
  const interval = setInterval(() => {
    if (loadingProgress.value >= 95) {
      clearInterval(interval);
      return;
    }
    
    // Incrémenter progressivement
    const increment = Math.floor(Math.random() * 8) + 1;
    loadingProgress.value = Math.min(95, loadingProgress.value + increment);
    
    // Changer le message occasionnellement
    if (loadingProgress.value > (messageIndex + 1) * 15 && messageIndex < loadingMessages.length - 1) {
      messageIndex++;
      loadingMessage.value = loadingMessages[messageIndex];
    }
  }, 400);
  
  return interval;
}

// Getters
const currentQuestion = computed(() => {
  if (questions.value.length === 0) return null;
  return questions.value[currentQuestionIndex.value];
});

// Taux de réussite en pourcentage
const successRate = computed(() => {
  if (questionsCompleted.value === 0) return 0;
  return Math.round((correctAnswers.value / questionsCompleted.value) * 100);
});

// Chargement initial des questions
onMounted(async () => {
  loadingMessage.value = loadingMessages[0];
  const progressInterval = simulateLoadingProgress();
  
  try {
    await loadMoreQuestions();
    loadingProgress.value = 100;
    loadingMessage.value = 'Questions prêtes !';
    
    // Petit délai pour montrer le 100%
    setTimeout(() => {
      isLoading.value = false;
      clearInterval(progressInterval);
    }, 500);
  } catch (err) {
    console.error('Erreur lors du chargement initial des questions:', err);
    error.value = "Impossible de charger les questions du quiz. Utilisation des questions de secours.";
    questions.value = getFallbackQuestions();
    
    setTimeout(() => {
      isLoading.value = false;
      clearInterval(progressInterval);
    }, 500);
  }
});

// Charger plus de questions depuis l'API
async function loadMoreQuestions() {
  try {
    if (!isLoading.value) {
      isLoading.value = true;
      simulateLoadingProgress();
    }
    
    const newQuestions = await generateQuizQuestions(questionsPerBatch);
    
    // Ajouter les nouvelles questions
    questions.value = [...questions.value, ...newQuestions];
    loadingProgress.value = 100;
    
    // Petit délai avant de cacher l'écran de chargement s'il est visible
    if (isLoading.value) {
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    }
  } catch (err) {
    console.error('Erreur lors du chargement des questions supplémentaires:', err);
    // Si on n'a pas de questions du tout, utiliser les questions de secours
    if (questions.value.length === 0) {
      questions.value = getFallbackQuestions();
    }
    
    loadingProgress.value = 100;
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
    
    throw err;
  }
}

// Actions
const submitAnswer = (answer) => {
  userAnswers.value[currentQuestionIndex.value] = answer;
  
  // Mettre à jour les compteurs de réponses correctes/incorrectes
  if (answer === currentQuestion.value.correctAnswer) {
    correctAnswers.value++;
  } else {
    incorrectAnswers.value++;
    
    // Décrémenter le nombre de vies si la réponse est incorrecte
    lives.value--;
    
    // Vérifier si le joueur n'a plus de vies
    if (lives.value <= 0) {
      gameOver.value = true;
    }
  }
  
  showExplanation.value = true;
};

const nextQuestion = async () => {
  // Si le jeu est terminé, ne pas passer à la question suivante
  if (gameOver.value) return;
  
  showExplanation.value = false;
  
  // Incrémenter le compteur de questions complétées
  questionsCompleted.value++;
  
  // Passer à la question suivante
  currentQuestionIndex.value++;
  
  // Si on approche de la fin des questions disponibles, charger plus de questions
  if (questions.value.length - currentQuestionIndex.value <= preloadThreshold) {
    try {
      console.log(`🔄 Plus que ${questions.value.length - currentQuestionIndex.value} questions disponibles, préchargement de nouvelles questions...`);
      await loadMoreQuestions();
    } catch (err) {
      console.error('Erreur lors du préchargement de nouvelles questions:', err);
    }
  }
};

// Réinitialiser le jeu pour recommencer
const restartGame = () => {
  // Réinitialiser toutes les variables du jeu
  currentQuestionIndex.value = 0;
  userAnswers.value = [];
  correctAnswers.value = 0;
  incorrectAnswers.value = 0;
  questionsCompleted.value = 0;
  showExplanation.value = false;
  lives.value = maxLives;
  gameOver.value = false;
};
</script>

<template>
  <div class="quiz-container">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-header">
        <div class="ai-badge">
          <span class="ai-icon">🤖</span>
          <span class="ai-text">IA en action</span>
        </div>
      </div>

      <div class="loading-content">
        <div class="loading-message">{{ loadingMessage }}</div>
        
        <div class="ai-thinking">
          <div class="thinking-dots">
            <div class="dot dot1"></div>
            <div class="dot dot2"></div>
            <div class="dot dot3"></div>
          </div>
        </div>
        
        <div class="loading-progress">
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: `${loadingProgress}%` }"></div>
          </div>
          <div class="progress-text">{{ loadingProgress }}%</div>
        </div>
        
        <div class="loading-info">
          <div class="info-item">
            <div class="info-icon">🧠</div>
            <div class="info-text">Génération de questions par Mistral AI</div>
          </div>
          <div class="info-item">
            <div class="info-icon">⚡️</div>
            <div class="info-text">Questions personnalisées sur l'alimentation locale</div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <p class="error-message">{{ error }}</p>
      <p class="error-description">Pas d'inquiétude, nous avons préparé des questions de secours pour vous.</p>
    </div>

    <div v-else-if="gameOver" class="game-over-container animate-fade-in">
      <div class="game-over-header">
        <div class="game-over-icon">💔</div>
        <h2 class="game-over-title">Fin du jeu !</h2>
      </div>
      
      <div class="game-over-content">
        <p class="game-over-text">Vous avez épuisé vos 3 vies.</p>
        
        <div class="game-over-stats">
          <div class="stat-item">
            <div class="stat-label">Questions complétées</div>
            <div class="stat-value">{{ questionsCompleted }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Réponses correctes</div>
            <div class="stat-value">{{ correctAnswers }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Réponses incorrectes</div>
            <div class="stat-value">{{ incorrectAnswers }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">Taux de réussite</div>
            <div class="stat-value">{{ successRate }}%</div>
          </div>
        </div>
        
        <button class="btn restart-btn" @click="restartGame">
          <span class="btn-icon">🔄</span>
          <span class="btn-text">Recommencer</span>
        </button>
      </div>
    </div>

    <div v-else class="quiz-content">
      <div class="quiz-header">
        <div class="stats-container">
          <div class="stats-row">
            <div class="score-badges">
              <div class="badge badge-correct">
                <span class="badge-icon">✓</span>
                <span class="badge-text">{{ correctAnswers }}</span>
              </div>
              <div class="badge badge-incorrect">
                <span class="badge-icon">✗</span>
                <span class="badge-text">{{ incorrectAnswers }}</span>
              </div>
              <div class="badge badge-success-rate" :style="{'--success-rate': successRate + '%'}">
                <span class="badge-text">{{ successRate }}%</span>
              </div>
              
              <!-- Affichage des vies -->
              <div class="badge badge-lives">
                <span class="lives-display">
                  <span v-for="n in maxLives" :key="n" class="life-heart" :class="{ 'lost': n > lives }">
                    {{ n <= lives ? '❤️' : '🖤' }}
                  </span>
                </span>
              </div>
            </div>
            <div class="question-counter">
              <span class="counter-text">Question {{ questionsCompleted + 1 }}</span>
              <span class="limited-badge">{{ maxLives }} vies</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="!showExplanation" class="question-wrapper animate-slide-in">
        <Question 
          :question="currentQuestion.question"
          :options="currentQuestion.options"
          @select-option="submitAnswer"
        />
      </div>
      
      <div v-else class="explanation-container animate-fade-in">
        <div class="explanation-header" :class="{'correct-header': userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer, 'incorrect-header': userAnswers[currentQuestionIndex] !== currentQuestion.correctAnswer}">
          <div class="result-icon">
            <svg v-if="userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h3 class="explanation-title">
            <span v-if="userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer" class="correct">
              Correct !
            </span>
            <span v-else class="incorrect">
              Incorrect
              <span class="lives-lost" v-if="lives > 0">(-1 vie)</span>
              <span class="lives-lost" v-else>(Plus de vies !)</span>
            </span>
          </h3>
        </div>
        
        <div class="explanation-body">
          <p class="explanation-text">
            {{ currentQuestion.explanation }}
          </p>
          
          <div class="explanation-detail">
            <div class="correct-answer" v-if="userAnswers[currentQuestionIndex] !== currentQuestion.correctAnswer">
              <span class="detail-label">Réponse correcte :</span>
              <span class="detail-value">{{ currentQuestion.correctAnswer }}</span>
            </div>
            
            <div class="your-answer">
              <span class="detail-label">Votre réponse :</span>
              <span class="detail-value">{{ userAnswers[currentQuestionIndex] }}</span>
            </div>
          </div>
        </div>
        
        <button v-if="!gameOver" class="btn next-btn" @click="nextQuestion">
          <span class="btn-text">Question suivante</span>
          <span class="btn-icon">→</span>
        </button>
        
        <button v-else class="btn game-over-btn" @click="restartGame">
          <span class="btn-icon">🔄</span>
          <span class="btn-text">Recommencer</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quiz-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  min-height: 400px;
}

/* Styles de chargement existants */
.loading-container {
  display: flex;
  flex-direction: column;
  padding: 0;
  height: 100%;
  min-height: 350px;
}

.loading-header {
  background-color: rgba(76, 175, 80, 0.1);
  padding: 1rem;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgba(76, 175, 80, 0.2);
}

.ai-badge {
  display: flex;
  align-items: center;
  background: linear-gradient(45deg, #4CAF50, #2E7D32);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(46, 125, 50, 0.3);
}

.ai-icon {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}

.ai-text {
  font-weight: 600;
  letter-spacing: 0.5px;
}

.loading-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

/* ... styles de chargement existants ... */

/* Nouveau style pour le header du quiz avec les statistiques */
.quiz-content {
  padding: 0;
}

.quiz-header {
  background-color: rgba(76, 175, 80, 0.08);
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(76, 175, 80, 0.2);
}

.stats-container {
  width: 100%;
}

.stats-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.score-badges {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.badge {
  display: flex;
  align-items: center;
  padding: 0.4rem 0.75rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.badge-correct {
  background-color: rgba(76, 175, 80, 0.15);
  color: var(--color-primary);
}

.badge-incorrect {
  background-color: rgba(244, 67, 54, 0.15);
  color: #f44336;
}

.badge-success-rate {
  background: linear-gradient(90deg, var(--color-primary) var(--success-rate), #e0e0e0 var(--success-rate));
  color: white;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}

.badge-icon {
  font-size: 0.9rem;
  margin-right: 0.35rem;
}

.badge-text {
  line-height: 1;
}

.badge-lives {
  background-color: rgba(233, 30, 99, 0.15);
  color: #e91e63;
}

.lives-display {
  display: flex;
  align-items: center;
}

.life-heart {
  margin: 0 1px;
  transition: all 0.3s ease;
}

.life-heart.lost {
  opacity: 0.7;
  transform: scale(0.85);
}

.lives-lost {
  font-size: 0.85rem;
  color: #f44336;
  margin-left: 0.5rem;
  font-weight: normal;
}

.limited-badge {
  display: inline-flex;
  align-items: center;
  background-color: #e91e63;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.8rem;
}

.question-counter {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.35rem;
}

.counter-text {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.game-over-container {
  display: flex;
  flex-direction: column;
  padding: 0;
  min-height: 350px;
}

.game-over-header {
  background-color: rgba(244, 67, 54, 0.1);
  padding: 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(244, 67, 54, 0.2);
}

.game-over-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: pulse 1.5s infinite alternate;
}

.game-over-title {
  margin: 0;
  color: #f44336;
  font-size: 1.8rem;
}

.game-over-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.game-over-text {
  font-size: 1.2rem;
  text-align: center;
  margin: 0;
}

.game-over-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
  margin-top: 1rem;
}

.stat-item {
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-grey);
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
}

.restart-btn, .game-over-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #f44336;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  transition: all 0.3s ease;
}

.restart-btn:hover, .game-over-btn:hover {
  background-color: #d32f2f;
}

@keyframes pulse {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

.question-wrapper {
  padding: 1.5rem;
}

.explanation-container {
  padding: 0;
  background-color: white;
}

.explanation-header {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.correct-header {
  background-color: rgba(76, 175, 80, 0.1);
  border-bottom: 1px solid rgba(76, 175, 80, 0.2);
}

.incorrect-header {
  background-color: rgba(244, 67, 54, 0.1);
  border-bottom: 1px solid rgba(244, 67, 54, 0.2);
}

.result-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
}

.correct-header .result-icon {
  color: var(--color-primary);
}

.incorrect-header .result-icon {
  color: #f44336;
}

.explanation-title {
  margin-bottom: 0;
  font-size: 1.1rem;
}

.correct {
  color: var(--color-primary);
}

.incorrect {
  color: #f44336;
}

.explanation-body {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.explanation-text {
  margin-bottom: 1.2rem;
  line-height: 1.6;
  font-size: 1rem;
}

.explanation-detail {
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0;
}

.correct-answer, .your-answer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.your-answer {
  margin-bottom: 0;
}

.detail-label {
  font-weight: 500;
  color: var(--color-grey);
}

.detail-value {
  font-weight: 600;
  color: var(--color-text);
}

.next-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 1.5rem;
  width: calc(100% - 3rem);
}

.btn-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.next-btn:hover .btn-icon {
  transform: translateX(4px);
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-slide-in {
  animation: slideIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@media (max-width: 600px) {
  .quiz-container {
    border-radius: 8px;
  }
  
  .quiz-header {
    padding: 1rem 1.2rem;
  }
  
  .question-wrapper, .explanation-body {
    padding: 1.2rem;
  }
  
  .next-btn {
    margin: 1rem 1.2rem;
    width: calc(100% - 2.4rem);
  }
  
  .score-badges {
    gap: 0.5rem;
  }
  
  .badge {
    padding: 0.35rem 0.6rem;
    font-size: 0.8rem;
  }
  
  .game-over-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>