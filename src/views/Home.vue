<script setup>
import { ref } from 'vue';
import Quiz from '../components/Quiz.vue';

const showQuiz = ref(false);
const startQuiz = () => {
  showQuiz.value = true;
};
</script>

<template>
  <div>
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
  </div>
</template>

<style scoped>
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
  justify-content: center;
}

.btn-icon {
  font-size: 1.5rem;
}

@media (min-width: 768px) {
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

@media (max-width: 600px) {
  .welcome-title {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
    padding: 0 0.5rem;
  }
  
  .message-card {
    padding: 1rem 0.8rem;
  }
  
  .message-strong {
    font-size: 1rem;
    line-height: 1.6;
  }
  
  .message-secondary {
    font-size: 0.9rem;
  }
  
  .features-grid {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  
  .feature-item {
    max-width: 100%;
    width: 90%;
  }
  
  .start-btn {
    font-size: 1.1rem;
    padding: 0.8rem 1.8rem;
    width: 100%;
  }
}
</style>