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
    <header class="header-container">
      <div class="header-content">
        <div class="logo-and-title">
          <div class="logo-container">
            <img src="./assets/logo.svg" alt="LocaQuizz Logo" class="logo" />
          </div>
          <div class="title-container">
            <h1 class="title-large">LocaQuizz</h1>
            <p class="slogan">Mange local, pense global… joue intelligent !</p>
          </div>
        </div>
        <div class="eco-badge">
          <span class="eco-icon">🌱</span>
          <span class="eco-text">Éco-responsable</span>
        </div>
      </div>
    </header>

    <main>
      <div v-if="!showQuiz" class="welcome-container animate-fade-in">
        <div class="welcome-content">
          <h2 class="welcome-title">Testez vos connaissances sur l'alimentation locale</h2>
          
          <div class="card message-card">
            <div class="card-icon">🌍</div>
            <p class="message-strong">
              Et si en quelques questions, vous changiez votre façon de consommer ? Avec LocaQuizz, découvrez l'impact de vos choix, défiez vos idées reçues, et devenez acteur d'une alimentation plus responsable, locale et durable.
            </p>
            <p class="message-secondary">Grâce à l'IA, chaque quiz est unique, comme chaque geste compte.</p>
          </div>

          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">♾️</div>
              <h3 class="feature-title">Quiz infini</h3>
              <p class="feature-desc">Des questions générées à l'infini par l'IA</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">🧠</div>
              <h3 class="feature-title">Apprentissage</h3>
              <p class="feature-desc">Améliorez vos connaissances à chaque question</p>
            </div>
            
            <div class="feature-item">
              <div class="feature-icon">🌱</div>
              <h3 class="feature-title">Impact réel</h3>
              <p class="feature-desc">Découvrez l'impact de vos choix alimentaires</p>
            </div>
          </div>

          <button class="btn start-btn" @click="startQuiz">
            <span class="btn-icon">🚀</span>
            <span class="btn-text">Commencer le quiz</span>
          </button>
        </div>
      </div>

      <Quiz v-else class="animate-fade-in" />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <a href="#" class="footer-link">À propos</a>
          <a href="#" class="footer-link">Politique de confidentialité</a>
          <a href="#" class="footer-link">Contact</a>
        </div>
        <p class="copyright">© 2025 LocaQuizz - Pour une alimentation responsable et durable</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.locaquizz-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header-container {
  background-color: var(--color-background);
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-and-title {
  display: flex;
  align-items: center;
}

.logo-container {
  margin-right: 1rem;
}

.logo {
  width: 120px;
  height: 120px;
}

.title-container {
  display: flex;
  flex-direction: column;
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

.eco-badge {
  display: flex;
  align-items: center;
  background-color: var(--color-eco);
  padding: 0.5rem 1rem;
  border-radius: 20px;
}

.eco-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.eco-text {
  font-size: 1rem;
  font-weight: 600;
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

.welcome-content {
  text-align: center;
}

.welcome-title {
  font-size: 1.8rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.message-card {
  max-width: 900px;
  margin: 0 auto;
  background-color: white;
  border-left: 5px solid var(--color-primary);
  padding: 1rem;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.message-strong {
  font-size: 1.2rem;
  line-height: 1.8;
  text-align: center;
  color: var(--color-text);
}

.message-secondary {
  font-size: 1rem;
  color: var(--color-secondary);
  margin-top: 0.5rem;
}

.features-grid {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.feature-item {
  text-align: center;
  max-width: 200px;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.feature-title {
  font-size: 1.2rem;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.feature-desc {
  font-size: 1rem;
  color: var(--color-text);
}

.start-btn {
  font-size: 1.25rem;
  padding: 1rem 2.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: auto;
  margin-top: 2rem;
}

.btn-icon {
  font-size: 1.5rem;
}

.footer {
  text-align: center;
  padding: 1.5rem;
  margin-top: 2rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.footer-link {
  color: var(--color-secondary);
  text-decoration: none;
  font-size: 1rem;
}

.footer-link:hover {
  text-decoration: underline;
}

.copyright {
  font-size: 0.9rem;
  color: var(--color-muted);
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

  .welcome-title {
    font-size: 2rem;
  }

  .features-grid {
    gap: 2rem;
  }

  .feature-item {
    max-width: 250px;
  }
}
</style>
