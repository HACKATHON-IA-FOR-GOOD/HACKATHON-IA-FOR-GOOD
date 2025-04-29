<template>
  <div class="about-container">
    <h1 class="page-title">À propos de LocaQuizz</h1>
    
    <div class="about-content">
      <p class="about-intro">
        LocaQuizz est une application éducative dédiée à sensibiliser les utilisateurs à l'importance de consommer local
        et de faire des choix alimentaires durables. Notre mission est de transformer la façon dont les gens pensent à leur 
        alimentation à travers un apprentissage ludique et interactif.
      </p>
      
      <h2 class="section-title">Notre équipe</h2>
      <div class="team-list">
        <div class="team-member">
          <h3 class="member-name">Valentin Vanhove</h3>
          <p class="member-role">Chef de projet & Développeur Full-Stack</p>
        </div>
        
        <div class="team-member">
          <h3 class="member-name">Omar Madjidi</h3>
          <p class="member-role">Développeur Frontend</p>
        </div>
        
        <div class="team-member">
          <h3 class="member-name">Vincent Altmann</h3>
          <p class="member-role">Ingénieur IA & Data Scientist</p>
        </div>
        
        <div class="team-member">
          <h3 class="member-name">Alexandre Giordana</h3>
          <p class="member-role">UX/UI Designer</p>
        </div>
        
        <div class="team-member">
          <h3 class="member-name">Gilchrist Laleye</h3>
          <p class="member-role">Développeur Backend</p>
        </div>
        
        <div class="team-member">
          <h3 class="member-name">Theo Fratia</h3>
          <p class="member-role">Spécialiste en durabilité</p>
        </div>
        
        <div class="team-member">
          <h3 class="member-name">Gael Pidoux</h3>
          <p class="member-role">Responsable marketing</p>
        </div>
      </div>
      
      <h2 class="section-title">Notre vision</h2>
      <p class="about-vision">
        Nous croyons qu'une meilleure compréhension de nos choix alimentaires peut conduire à un impact positif sur notre santé,
        nos communautés locales et l'environnement. LocaQuizz utilise la puissance de l'intelligence artificielle pour créer 
        une expérience d'apprentissage personnalisée et engageante pour chaque utilisateur.
      </p>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-title {
  color: var(--color-primary);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.about-content {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.about-intro {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: var(--color-text);
}

.section-title {
  color: var(--color-secondary);
  font-size: 1.8rem;
  margin: 1.5rem 0 1rem;
  border-bottom: 2px solid var(--color-eco);
  padding-bottom: 0.5rem;
}

.team-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.team-member {
  background-color: #f9f9f9;
  border-left: 4px solid var(--color-primary);
  padding: 1rem;
  border-radius: 4px;
}

.member-name {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.member-role {
  color: var(--color-secondary);
  font-style: italic;
}

.about-vision {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-text);
}

@media (max-width: 600px) {
  .page-title {
    font-size: 2rem;
  }
  
  .about-content {
    padding: 1.5rem;
  }
  
  .team-list {
    grid-template-columns: 1fr;
  }
}
</style>