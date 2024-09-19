import { Component, OnInit } from '@angular/core';
import { Question } from 'src/backend/question/question.interface';
import { QuestionService } from 'src/backend/question/question.service';
import { AuthService } from "../../backend/user/auth.service";
import { User } from 'src/backend/user/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  responses: {
    name: string;
    content: string;
    type: string;
    choice?: string[];
    response: string;
    userId: number;
    questionId: number;
    error?: string;
  }[] = [];

  userId: number | null = null;
  currentResponse: any = '';  // Réponse courante (peut être un tableau pour les checkboxes)
  errorMessage: string = '';  // Message d'erreur pour la validation

  constructor(
    private questionService: QuestionService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user: User | null) => {
        if (user) {
          this.userId = user.id;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', err);
      }
    });

    this.questionService.listAll().subscribe((questions) => {
      this.questions = questions;
      this.currentQuestionIndex = 0;
      this.initializeCurrentResponse();
    });
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  
  nextQuestion(): void {
    if (this.validateCurrentResponse()) {  // Valider avant de passer à la question suivante
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.saveResponse();
        this.currentQuestionIndex++;
        this.initializeCurrentResponse();
        this.errorMessage = '';  // Réinitialiser le message d'erreur
      }
    }
  }

  initializeCurrentResponse(): void {
    if (this.currentQuestion.type === 'time') {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      this.currentResponse = `${hours}:${minutes}`;
    } else {
      this.currentResponse = '';
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.initializeCurrentResponse();
      this.errorMessage = '';  // Réinitialiser le message d'erreur
    }
  }

  saveResponse(): void {
    if (this.userId !== null) {
      const existingResponse = this.responses.find(r => r.questionId === this.currentQuestion.id);
  
      let responseValue = this.currentResponse;
      
      // Vérifier si c'est un tableau (cas des checkbox) et le convertir en chaîne JSON
      if (Array.isArray(responseValue)) {
        responseValue = JSON.stringify(responseValue);  // Convertir le tableau en chaîne JSON
      }
  
      if (existingResponse) {
        existingResponse.response = responseValue;  // Sauvegarder la chaîne JSON si c'est une checkbox
        existingResponse.error = '';  // Enlever l'erreur si elle existe
      } else {
        this.responses.push({
          name: this.currentQuestion.name,
          content: this.currentQuestion.content,
          type: this.currentQuestion.type,
          choice: this.currentQuestion.choice || [],
          response: responseValue,  // Sauvegarder sous forme de chaîne JSON si c'est une checkbox
          userId: this.userId,
          questionId: this.currentQuestion.id,
          error: ''
        });
      }
      this.currentResponse = '';  // Réinitialiser après l'enregistrement
    }
  }

  validateCurrentResponse(): boolean {
    if (this.currentQuestion.type === 'number') {
      const responseNumber = parseFloat(this.currentResponse);
      if (isNaN(responseNumber)) {
        this.errorMessage = 'Veuillez entrer un nombre valide.';
        return false;
      }
      if (responseNumber < 0) {
        this.errorMessage = 'Veuillez entrer un nombre positif.';
        return false;
      }
    }
    return true;  // Réponse valide
  }

  onCheckboxChange(option: string, event: any): void {
    if (event.detail.checked) {
      this.currentResponse = [...(this.currentResponse || []), option];
    } else {
      this.currentResponse = (this.currentResponse || []).filter((item: string) => item !== option);
    }
  }
  isNextDisabled(): boolean {
    // Vérifier si la réponse est vide
    if (!this.currentResponse) {
      return true;  // Désactiver le bouton si aucune réponse n'est fournie
    }
  
    // Si c'est une question de type 'number', s'assurer que la réponse est un nombre valide
    if (this.currentQuestion.type === 'number') {
      const responseNumber = parseFloat(this.currentResponse);
      if (isNaN(responseNumber) || responseNumber < 0) {
        return true;  // Désactiver le bouton si la réponse n'est pas un nombre valide ou est négative
      }
    }
  
    // Pour tous les autres types, activer le bouton si une réponse est présente
    return false;
  }
  onSubmit(): void {
    if (this.validateCurrentResponse()) {  // Valider avant de soumettre
      this.saveResponse();
      if (this.responses.length > 0) {
        this.responses.forEach((response) => {
          const responseData = { response: response.response };
          this.questionService.newResponses(response.questionId, responseData).subscribe({
            next: (result) => {
              console.log('Réponse soumise avec succès:', result);
            },
            error: (error) => {
              console.error('Erreur lors de la soumission de la réponse:', error);
            }
          });
        });
        this.router.navigate(['/home']);
      } else {
        console.error('Aucune réponse fournie.');
      }
    }
  }
}
