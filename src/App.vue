<script setup>
// Aucune logique spécifique nécessaire ici, tout est géré par le routeur
</script>

<template>
  <div class="locaquizz-app">
    <header class="header-container">
      <div class="header-content">
        <div class="logo-and-title">
          <div class="logo-container">
            <router-link to="/" class="footer-link">
            <img src="./assets/logo.svg" alt="LocaQuizz Logo" class="logo" />
            </router-link>
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
      <!-- Le routeur vue injectera le composant correspondant à la route ici -->
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <router-link to="/about" class="footer-link">À propos</router-link>
          <router-link to="/privacy" class="footer-link">Politique de confidentialité</router-link>
          <router-link to="/contact" class="footer-link">Contact</router-link>
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
}

/* Amélioration pour mobile */
@media (max-width: 600px) {
  .header-container {
    padding: 1rem 0.8rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .logo-and-title {
    flex-direction: column;
    text-align: center;
  }
  
  .logo-container {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
  
  .logo {
    width: 80px;
    height: 80px;
  }
  
  .title-large {
    font-size: 2rem;
  }
  
  .slogan {
    font-size: 0.9rem;
  }
  
  .eco-badge {
    padding: 0.4rem 0.8rem;
    border-radius: 15px;
  }
  
  .eco-icon {
    font-size: 1.2rem;
  }
  
  .eco-text {
    font-size: 0.9rem;
  }
  
  main {
    padding: 0.8rem;
  }
  
  .footer {
    padding: 1.2rem 0.8rem;
  }
  
  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.8rem;
  }
  
  .copyright {
    font-size: 0.8rem;
    padding: 0 1rem;
  }
}
</style>
