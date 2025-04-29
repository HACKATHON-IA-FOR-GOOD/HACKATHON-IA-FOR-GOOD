<script setup>
import { ref, computed } from 'vue';
import Question from './Question.vue';
import Result from './Result.vue';

// Questions du quiz
const questions = [
  {
    question: "Quelle est la capitale de la France?",
    options: ["Paris", "Londres", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Quel est le plus grand océan du monde?",
    options: ["Océan Atlantique", "Océan Indien", "Océan Pacifique", "Océan Arctique"],
    correctAnswer: "Océan Pacifique"
  },
  {
    question: "Quelle est la planète la plus proche du soleil?",
    options: ["Vénus", "Terre", "Mars", "Mercure"],
    correctAnswer: "Mercure"
  },
  {
    question: "Qui a écrit 'Les Misérables'?",
    options: ["Albert Camus", "Victor Hugo", "Émile Zola", "Gustave Flaubert"],
    correctAnswer: "Victor Hugo"
  },
  {
    question: "Quel est l'élément chimique de symbole 'O'?",
    options: ["Or", "Osmium", "Oxygène", "Oganesson"],
    correctAnswer: "Oxygène"
  }
];

// État du quiz
const currentQuestionIndex = ref(0);
const userAnswers = ref([]);
const quizCompleted = ref(false);

// Getters
const currentQuestion = computed(() => questions[currentQuestionIndex.value]);
const totalQuestions = questions.length;

// Score final
const score = computed(() => {
  return userAnswers.value.reduce((acc, answer, index) => {
    return answer === questions[index].correctAnswer ? acc + 1 : acc;
  }, 0);
});

// Actions
const submitAnswer = (answer) => {
  userAnswers.value.push(answer);
  
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
};
</script>

<template>
  <div class="quiz-container">
    <h1>Quiz</h1>
    
    <div v-if="!quizCompleted">
      <div class="progress">
        Question {{ currentQuestionIndex + 1 }}/{{ totalQuestions }}
      </div>
      
      <Question 
        :question="currentQuestion.question"
        :options="currentQuestion.options"
        @select-option="submitAnswer"
      />
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
  background-color: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: var(--color-heading);
  margin-bottom: 2rem;
}

.progress {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: var(--color-text);
}
</style>