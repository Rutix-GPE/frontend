// src/backend/response/response.interface.ts

export interface Response {
     questionId: number;
     questionContent: string;   // Contenu de la question
     response: string;          // Réponse détaillée
     creationDate: string;      // Date de création
     updatedDate: string;       // Date de mise à jour
     questionName: string;      // Nom de la question
     questionType: string;      // Type de la question
     questionChoice: any[];     // Choix disponibles pour la question
     questionPage: number;      // Page de la question
     error?: string;    // Optionnel : pour inclure un message d'erreur si nécessaire
  }
  