/**
 * Service pour récupérer des questions de quiz depuis l'API Mistral AI
 */

const MISTRAL_API_URL = "https://api.mistral.ai/v1/agents/completions";
const MISTRAL_API_TOKEN = "Bearer 4V0v0yJgj6qHLaZgT6kKvU0N3Nwt1Kua";
const AGENT_ID = "ag:5658eee9:20250429:quiz:2ff9e1b6";

/**
 * Génère des questions de quiz à partir de l'API Mistral AI
 * @param {number} nbQuestions - Nombre de questions à générer (défaut: 10)
 * @returns {Promise<Array>} - Liste de questions générées
 */
export async function generateQuizQuestions(nbQuestions = 10) {
  console.log(`🤖 Demande de génération de ${nbQuestions} questions via l'IA...`);
  const startTime = performance.now();
  
  try {
    const response = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': MISTRAL_API_TOKEN,
      },
      body: JSON.stringify({
        agent_id: AGENT_ID,
        messages: [
          {
            role: "user", 
            content: `{nb_question: ${nbQuestions}}`
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur API Mistral:', errorData);
      throw new Error(`Erreur lors de la génération des questions: ${response.status}`);
    }

    const data = await response.json();
    
    // Parse le contenu JSON retourné dans le message de l'assistant
    // L'API retourne le JSON sous forme de texte dans le champ content
    const contentStr = data.choices[0].message.content;
    const quizData = JSON.parse(contentStr);
    
    const endTime = performance.now();
    const elapsedTime = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`✅ ${nbQuestions} questions générées avec succès par l'IA en ${elapsedTime} secondes!`);
    console.log(`📊 Tokens utilisés: ${data.usage.completion_tokens} completion, ${data.usage.prompt_tokens} prompt (total: ${data.usage.total_tokens})`);
    
    // Adapter le format des questions pour notre application
    return formatQuizQuestions(quizData.quiz);
  } catch (error) {
    console.error('❌ Erreur lors de la génération des questions:', error);
    throw error;
  }
}

/**
 * Adapte le format des questions reçues de l'API pour qu'il corresponde
 * au format utilisé dans l'application
 */
function formatQuizQuestions(apiQuestions) {
  return apiQuestions.map(q => ({
    question: q.question,
    options: q.options.map(opt => opt.text),
    correctAnswer: q.options.find(opt => opt.id === q.correct_answer_id).text,
    explanation: q.explanation
  }));
}

/**
 * Génère des questions de secours en cas d'échec de l'API
 * @returns {Array} - Liste de questions par défaut
 */
export function getFallbackQuestions() {
  return [
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
}