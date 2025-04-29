<template>
  <div class="contact-container">
    <h1 class="page-title">Contactez-nous</h1>
    
    <div class="contact-content">
      <div class="contact-info">
        <div class="info-block">
          <h2 class="info-title">Email</h2>
          <a href="mailto:valentin.vanhove@ynov.com" class="info-value email-link">
            valentin.vanhove@ynov.com
          </a>
        </div>
        
        <div class="info-block">
          <h2 class="info-title">Adresse</h2>
          <p class="info-value">
            Lyon Ynov Campus<br>
            6 Cr de Verdun Rambaud<br>
            69002 Lyon<br>
            France
          </p>
        </div>
        
        <div class="info-block">
          <h2 class="info-title">Horaires</h2>
          <p class="info-value">
            Du lundi au vendredi<br>
            9h - 18h
          </p>
        </div>
      </div>
      
      <div class="contact-form-section">
        <h2 class="form-title">Envoyez-nous un message</h2>
        <form class="contact-form">
          <div class="form-group">
            <label for="name">Nom</label>
            <input type="text" id="name" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label for="subject">Sujet</label>
            <input type="text" id="subject" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" class="form-control" rows="5" required></textarea>
          </div>
          
          <button type="submit" class="submit-btn">
            Envoyer
          </button>
        </form>
      </div>
    </div>
    
    <div class="faq-section">
      <h2 class="section-title">Questions fréquemment posées</h2>
      
      <div class="faq-item">
        <h3 class="faq-question">Comment fonctionne LocaQuizz?</h3>
        <p class="faq-answer">
          LocaQuizz utilise l'intelligence artificielle pour générer des questions personnalisées sur l'alimentation locale
          et durable. À chaque session, vous recevez des questions uniques adaptées à votre niveau de connaissance.
        </p>
      </div>
      
      <div class="faq-item">
        <h3 class="faq-question">Est-ce que LocaQuizz est gratuit?</h3>
        <p class="faq-answer">
          Oui, LocaQuizz est entièrement gratuit. Notre mission est d'éduquer le plus grand nombre de personnes possible
          sur l'importance de consommer local.
        </p>
      </div>
      
      <div class="faq-item">
        <h3 class="faq-question">Comment puis-je contribuer au projet?</h3>
        <p class="faq-answer">
          Nous sommes toujours à la recherche de collaborateurs passionnés par l'alimentation durable! 
          N'hésitez pas à nous contacter par email pour discuter des possibilités de contribution.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-title {
  color: var(--color-primary);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

.contact-info {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-block {
  margin-bottom: 1.5rem;
}

.info-title {
  color: var(--color-secondary);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-eco);
  padding-bottom: 0.3rem;
}

.info-value {
  color: var(--color-text);
  line-height: 1.6;
}

.email-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: bold;
}

.email-link:hover {
  text-decoration: underline;
}

.contact-form-section {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  color: var(--color-primary);
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.form-group label {
  color: var(--color-secondary);
  font-weight: 600;
}

.form-control {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
}

textarea.form-control {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  background-color: var(--color-primary);
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;
  align-self: flex-end;
}

.submit-btn:hover {
  background-color: var(--color-primary-dark);
}

.faq-section {
  margin-top: 3rem;
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: var(--color-primary);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.faq-item {
  border-bottom: 1px solid #eee;
  padding-bottom: 1.2rem;
  margin-bottom: 1.2rem;
}

.faq-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.faq-question {
  color: var(--color-secondary);
  font-size: 1.3rem;
  margin-bottom: 0.6rem;
}

.faq-answer {
  color: var(--color-text);
  line-height: 1.6;
}

@media (max-width: 900px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .page-title {
    font-size: 2rem;
  }
  
  .contact-form-section,
  .contact-info,
  .faq-section {
    padding: 1.5rem;
  }
  
  .form-title,
  .section-title {
    font-size: 1.5rem;
  }
  
  .submit-btn {
    width: 100%;
    align-self: center;
  }
}
</style>