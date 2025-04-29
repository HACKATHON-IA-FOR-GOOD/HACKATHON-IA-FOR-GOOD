<script setup>
import { ref, computed } from 'vue';
import Question from './Question.vue';
import Result from './Result.vue';

// Questions du quiz sur l'alimentation locale et durable
const questions = [
  {
    question: "Quelle est la distance moyenne parcourue par les aliments dans notre assiette en France ?",
    options: ["100 km", "550 km", "1500 km", "3000 km"],
    correctAnswer: "1500 km",
    explanation: "En moyenne, les aliments dans notre assiette parcourent 1500 km avant d'être consommés. Choisir des produits locaux peut réduire considérablement cette distance et l'impact écologique associé."
  },
  {
    question: "Quelle part des émissions de gaz à effet de serre mondiales est due au système alimentaire ?",
    options: ["5 à 10%", "15 à 20%", "25 à 30%", "Plus de 30%"],
    correctAnswer: "25 à 30%",
    explanation: "Le système alimentaire mondial est responsable de 25 à 30% des émissions de gaz à effet de serre, incluant la production, la transformation, le transport, et le gaspillage alimentaire."
  },
  {
    question: "Quel pourcentage d'eau douce mondiale est utilisé par l'agriculture ?",
    options: ["30%", "50%", "70%", "90%"],
    correctAnswer: "70%",
    explanation: "L'agriculture consomme environ 70% de l'eau douce disponible dans le monde. Les productions locales adaptées au climat de leur région nécessitent généralement moins d'irrigation."
  },
  {
    question: "Qu'est-ce qu'un AMAP ?",
    options: ["Association pour le Maintien d'une Agriculture Paysanne", "Agence de Maîtrise Alimentaire et de Production", "Association Mondiale pour l'Agriculture Protégée", "Autorité de Modernisation Agricole et Paysanne"],
    correctAnswer: "Association pour le Maintien d'une Agriculture Paysanne",
    explanation: "Une AMAP (Association pour le Maintien d'une Agriculture Paysanne) est un partenariat entre un groupe de consommateurs et une ferme locale, basé sur un système de distribution de paniers de produits fermiers."
  },
  {
    question: "Combien de temps peut-on conserver un fruit local cueilli à maturité par rapport à un fruit importé cueilli vert ?",
    options: ["Moins longtemps", "Plus longtemps", "Même durée", "Cela dépend uniquement du type de fruit"],
    correctAnswer: "Moins longtemps",
    explanation: "Les fruits locaux cueillis à maturité se conservent généralement moins longtemps car ils n'ont pas été sélectionnés pour leur capacité à voyager. Ils sont cependant plus nutritifs et savoureux."
  }
];

// État du quiz
const currentQuestionIndex = ref(0);
const userAnswers = ref([]);
const quizCompleted = ref(false);
const showExplanation = ref(false);

// Getters
const currentQuestion = computed(() => questions[currentQuestionIndex.value]);
const totalQuestions = questions.length;
const progressPercentage = computed(() => (currentQuestionIndex.value / totalQuestions) * 100);

// Score final
const score = computed(() => {
  return userAnswers.value.reduce((acc, answer, index) => {
    return answer === questions[index].correctAnswer ? acc + 1 : acc;
  }, 0);
});

// Actions
const submitAnswer = (answer) => {
  userAnswers.value[currentQuestionIndex.value] = answer;
  showExplanation.value = true;
};

const nextQuestion = () => {
  showExplanation.value = false;
  
  if (currentQuestionIndex.value < totalQuestions - 1) {
    currentQuestionIndex.value++;
  } else {
    quizCompleted.value = true;
  }
};

const resetQuiz = () => {
  currentQuestionIndex.value = 0;
  userAnswers.value = [];
  quizCompleted.value = false;
  showExplanation.value = false;
};
</script>

<template>
  <div class="quiz-container">
    <div v-if="!quizCompleted" class="quiz-content">
      <div class="quiz-header">
        <div class="progress-container">
          <div class="progress-info">
            <span class="progress-status">Question {{ currentQuestionIndex + 1 }}/{{ totalQuestions }}</span>
            <span class="progress-percentage">{{ Math.round(progressPercentage) }}% complété</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
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
        
        <button class="btn next-btn" @click="nextQuestion">
          <span class="btn-text">{{ currentQuestionIndex < totalQuestions - 1 ? 'Question suivante' : 'Voir les résultats' }}</span>
          <span class="btn-icon">→</span>
        </button>
      </div>
    </div>
    
    <Result 
      v-else
      :score="score" 
      :total="totalQuestions" 
      @reset="resetQuiz"
    />
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
}

.quiz-content {
  padding: 0;
}

.quiz-header {
  background-color: rgba(76, 175, 80, 0.08);
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(76, 175, 80, 0.2);
}

.progress-container {
  margin-bottom: 0;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.progress-status {
  font-weight: 600;
  color: var(--color-primary);
}

.progress-percentage {
  color: var(--color-grey);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 0;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.5s ease;
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
}
</style>