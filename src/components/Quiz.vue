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
  <div class="quiz-container card">
    <div v-if="!quizCompleted">
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
        </div>
        <div class="progress-text">
          Question {{ currentQuestionIndex + 1 }}/{{ totalQuestions }}
        </div>
      </div>
      
      <div v-if="!showExplanation">
        <Question 
          :question="currentQuestion.question"
          :options="currentQuestion.options"
          @select-option="submitAnswer"
        />
      </div>
      
      <div v-else class="explanation-container animate-fade-in">
        <h3 class="explanation-title">
          <span v-if="userAnswers[currentQuestionIndex] === currentQuestion.correctAnswer" class="correct">
            Correct !
          </span>
          <span v-else class="incorrect">
            Incorrect
          </span>
        </h3>
        
        <p class="explanation-text">
          {{ currentQuestion.explanation }}
        </p>
        
        <button class="btn next-btn" @click="nextQuestion">
          {{ currentQuestionIndex < totalQuestions - 1 ? 'Question suivante' : 'Voir les résultats' }}
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
  padding: 2rem;
}

.progress-container {
  margin-bottom: 2rem;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--color-primary);
  transition: width 0.3s ease;
}

.progress-text {
  text-align: right;
  font-size: 0.9rem;
  color: var(--color-grey);
}

.explanation-container {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-left: 4px solid var(--color-secondary);
}

.explanation-title {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.correct {
  color: var(--color-primary);
}

.incorrect {
  color: #f44336;
}

.explanation-text {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.next-btn {
  display: block;
  margin-left: auto;
}

@media (max-width: 600px) {
  .quiz-container {
    padding: 1.5rem;
  }
}
</style>