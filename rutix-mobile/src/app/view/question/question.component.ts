import { Component, OnInit } from '@angular/core';
import { Question } from 'src/backend/question/question.interface';
import { QuestionService } from 'src/backend/question/question.service';
import { AuthService } from "../../../backend/user/auth.service";
import { User } from 'src/backend/user/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  currentQuestion: {
    question: string;
    answer: string[];
    url: string;
  } | null = null;
  
  currentResponse: string = '';
  errorMessage: string = '';
  userId: number | null = null;

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
          this.loadFirstQuestion();
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', err);
      }
    });
  }

  loadFirstQuestion(): void {
    this.questionService.getFirstQuestion().subscribe({
      next: (data) => {
        this.currentQuestion = data;
        this.currentResponse = '';
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la première question:', error);
      }
    });
  }

  nextQuestion(): void {
    if (this.validateCurrentResponse() && this.currentQuestion) {
      this.questionService.getNextQuestion(this.currentQuestion.url, this.currentResponse).subscribe({
        next: (data) => {
          if (!data.url) {
            // Si pas d'URL suivante, c'est la dernière question
            this.router.navigate(['/home']);
          } else {
            this.currentQuestion = data;
            this.currentResponse = '';
            this.errorMessage = '';
          }
        },
        error: (error) => {
          console.error('Erreur lors du chargement de la question suivante:', error);
        }
      });
    }
  }

  validateCurrentResponse(): boolean {
    if (!this.currentResponse) {
      this.errorMessage = 'Veuillez sélectionner une réponse.';
      return false;
    }
    return true;
  }

  isNextDisabled(): boolean {
    return !this.currentResponse;
  }
}
