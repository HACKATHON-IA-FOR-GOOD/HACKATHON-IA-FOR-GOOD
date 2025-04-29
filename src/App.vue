<script setup>
import { ref } from 'vue';
import Quiz from './components/Quiz.vue';

const showQuiz = ref(false);
const startQuiz = () => {
  showQuiz.value = true;
};
</script>

<template>
  <div class="locaquizz-app">
    <header>
      <div class="logo-container">
        <img src="./assets/logo.svg" alt="LocaQuizz Logo" class="logo" />
      </div>
      <h1 class="title-large">LocaQuizz</h1>
      <p class="slogan">Mange local, pense global… joue intelligent !</p>
    </header>

    <main>
      <div v-if="!showQuiz" class="welcome-container animate-fade-in">
        <div class="card message-card">
          <p class="message-strong">
            Et si en quelques questions, vous changiez votre façon de consommer ? Avec LocaQuizz, découvrez l'impact de vos choix, défiez vos idées reçues, et devenez acteur d'une alimentation plus responsable, locale et durable. Grâce à l'IA, chaque quiz est unique, comme chaque geste compte.
          </p>
        </div>

        <button class="btn start-btn animate-pulse" @click="startQuiz">
          Commencer le quiz
        </button>
      </div>

      <Quiz v-else class="animate-fade-in" />
    </main>

    <footer class="footer">
      <p class="text-muted">© 2025 LocaQuizz - Pour une alimentation responsable et durable</p>
    </footer>
  </div>
</template>

<style scoped>
.locaquizz-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
}

.logo-container {
  margin-bottom: 1rem;
}

.logo {
  width: 120px;
  height: 120px;
  margin: 0 auto;
}

.title-large {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.slogan {
  font-size: 1.2rem;
  color: var(--color-secondary);
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}

main {
  flex: 1;
  padding: 1rem;
}

.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.message-card {
  max-width: 900px;
  margin: 0 auto;
  background-color: white;
  border-left: 5px solid var(--color-primary);
}

.message-strong {
  font-size: 1.2rem;
  line-height: 1.8;
  text-align: center;
  color: var(--color-text);
}

.start-btn {
  font-size: 1.25rem;
  padding: 1rem 2.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.footer {
  text-align: center;
  padding: 1.5rem;
  margin-top: 2rem;
}

/* Responsive */
@media (min-width: 768px) {
  .logo {
    width: 150px;
    height: 150px;
  }

  .title-large {
    font-size: 3rem;
  }

  .slogan {
    font-size: 1.5rem;
  }

  .message-strong {
    font-size: 1.4rem;
  }
}
</style>
