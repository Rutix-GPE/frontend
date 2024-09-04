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
    name: string;          // Le nom de la question
    content: string;       // Le contenu de la question
    type: string;          // Le type de la question (ex: time, text, etc.)
    choice?: string[];     // Les choix si c'est une question à choix multiples
    response: string;      // La réponse de l'utilisateur
    userId: number;        // ID de l'utilisateur
    questionId: number;    // ID de la question
  }[] = [];

  userId: number | null = null;
  currentResponse: any = '';  // Réponse courante (peut être un tableau pour les checkboxes)

  constructor(
    private questionService: QuestionService,
    private authService: AuthService,
    private router: Router  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (user: User | null) => {
        console.log(user);

        if (user) {
          this.userId = user.id;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', err);
      },
      complete: () => {
        console.log('Chargement de l\'utilisateur terminé');
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
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.saveResponse();  // Sauvegarder la réponse courante
      this.currentQuestionIndex++;  // Passer à la question suivante
      this.initializeCurrentResponse();  // Réinitialiser la réponse pour la nouvelle question
    }
  }

  initializeCurrentResponse(): void {
    if (this.currentQuestion.type === 'time') {
      // Si c'est une question de type "time", initialiser avec l'heure actuelle
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      this.currentResponse = `${hours}:${minutes}`;  // Initialiser avec l'heure actuelle au format HH:mm
    } else {
      this.currentResponse = '';  // Réinitialiser pour les autres types de questions
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.currentResponse = ''; // Réinitialiser la réponse courante
    }
  }

  saveResponse(): void {
    if (this.userId !== null) {
      let responseToSave = this.currentResponse;

      const existingResponse = this.responses.find(r => r.questionId === this.currentQuestion.id);

      if (existingResponse) {
        // Mise à jour de la réponse existante
        existingResponse.response = responseToSave;
      } else {
        // Ajout de la réponse
        this.responses.push({
          name: this.currentQuestion.name,
          content: this.currentQuestion.content,
          type: this.currentQuestion.type,
          choice: this.currentQuestion.choice || [],  // Ajouter les choix si c'est une question à choix multiples
          response: responseToSave,
          userId: this.userId,
          questionId: this.currentQuestion.id
        });
      }

      console.log('Réponse sauvegardée:', this.responses);  // Vérification

      this.currentResponse = '';  // Réinitialiser après l'enregistrement
    }
  }

  onCheckboxChange(option: string, event: any): void {
    if (event.detail.checked) {
      this.currentResponse = [...(this.currentResponse || []), option]; // Ajouter l'option
    } else {
      this.currentResponse = (this.currentResponse || []).filter((item: string) => item !== option); // Retirer l'option
    }
  }

  onSubmit(): void {
    this.saveResponse();  // Sauvegarder la dernière réponse avant soumission

    if (this.responses.length > 0) {
      // Boucler sur chaque réponse et l'envoyer à Symfony
      this.responses.forEach((response) => {
        const responseData = {
          response: response.response  // La réponse de l'utilisateur
        };

        // Appel à l'API pour soumettre la réponse pour chaque question
        this.questionService.newResponses(response.questionId, responseData).subscribe({
          next: (result) => {
            console.log('Réponse soumise avec succès:', result);
          },
          error: (error) => {
            console.error('Erreur lors de la soumission de la réponse:', error);
          }
        });
      });
      this.router.navigate(['/home'])
    } else {
      console.error('Aucune réponse fournie.');
    }

  }
}
