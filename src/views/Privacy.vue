<template>
  <div class="privacy-container">
    <h1 class="page-title">Politique de Confidentialité</h1>
    
    <div class="privacy-content">
      <p class="last-updated">Dernière mise à jour: 29 avril 2025</p>
      
      <section class="privacy-section">
        <h2 class="section-title">Introduction</h2>
        <p>
          Chez LocaQuizz, nous accordons une grande importance à la protection de vos données personnelles. 
          Cette politique de confidentialité vous explique comment nous collectons, utilisons et protégeons vos informations 
          lorsque vous utilisez notre application.
        </p>
      </section>
      
      <section class="privacy-section">
        <h2 class="section-title">Données collectées</h2>
        <p>
          Nous collectons les informations suivantes lorsque vous utilisez LocaQuizz:
        </p>
        <ul class="data-list">
          <li>Les réponses que vous fournissez aux questions du quiz</li>
          <li>Vos préférences d'apprentissage pour personnaliser votre expérience</li>
          <li>Des données d'utilisation anonymes pour améliorer notre service</li>
        </ul>
        <p>
          Nous ne collectons pas d'informations personnelles identifiables sans votre consentement explicite.
        </p>
      </section>
      
      <section class="privacy-section">
        <h2 class="section-title">Utilisation des données</h2>
        <p>
          Les données collectées sont utilisées dans le but de:
        </p>
        <ul class="data-list">
          <li>Personnaliser votre expérience d'apprentissage</li>
          <li>Améliorer notre algorithme de génération de questions</li>
          <li>Analyser l'efficacité de notre contenu éducatif</li>
          <li>Développer de nouvelles fonctionnalités basées sur les comportements des utilisateurs</li>
        </ul>
      </section>
      
      <section class="privacy-section">
        <h2 class="section-title">Protection des données</h2>
        <p>
          Nous mettons en place des mesures de sécurité adaptées pour protéger vos données contre tout accès, 
          modification, divulgation ou destruction non autorisé. Les données sont stockées de manière sécurisée 
          et traitées avec le plus grand soin.
        </p>
      </section>
      
      <section class="privacy-section">
        <h2 class="section-title">Partage des données</h2>
        <p>
          Nous ne vendons ni ne partageons vos données personnelles avec des tiers, sauf dans les cas suivants:
        </p>
        <ul class="data-list">
          <li>Avec votre consentement explicite</li>
          <li>Pour se conformer à une obligation légale</li>
          <li>Pour protéger nos droits, notre vie privée, notre sécurité ou notre propriété</li>
        </ul>
      </section>
      
      <section class="privacy-section">
        <h2 class="section-title">Vos droits</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants:
        </p>
        <ul class="data-list">
          <li>Droit d'accès à vos données personnelles</li>
          <li>Droit de rectification de vos données</li>
          <li>Droit à l'effacement de vos données</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit à la portabilité des données</li>
          <li>Droit d'opposition au traitement</li>
        </ul>
        <p>
          Pour exercer ces droits, veuillez nous contacter à l'adresse indiquée ci-dessous.
        </p>
      </section>
      
      <section class="privacy-section">
        <h2 class="section-title">Contact</h2>
        <p>
          Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à:
          <a href="mailto:valentin.vanhove@ynov.com" class="contact-email">valentin.vanhove@ynov.com</a>
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.privacy-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-title {
  color: var(--color-primary);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.privacy-content {
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.last-updated {
  font-style: italic;
  color: var(--color-secondary);
  text-align: right;
  margin-bottom: 1.5rem;
}

.privacy-section {
  margin-bottom: 2rem;
}

.section-title {
  color: var(--color-secondary);
  font-size: 1.6rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-eco);
  padding-bottom: 0.5rem;
}

.privacy-section p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: var(--color-text);
}

.data-list {
  margin-left: 2rem;
  margin-bottom: 1rem;
}

.data-list li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.contact-email {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: bold;
}

.contact-email:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .page-title {
    font-size: 2rem;
  }
  
  .privacy-content {
    padding: 1.5rem;
  }
  
  .section-title {
    font-size: 1.4rem;
  }
}
</style>