import { Component, OnInit } from '@angular/core';
import { Question } from 'src/backend/question/question.interface';
import { QuestionService } from 'src/backend/question/question.service';
import {AuthService} from "../../backend/user/auth.service";


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  responses: { userId: number, questionId: number, response: string }[] = [];
  userId: number | null = null;

  constructor(
    private questionService: QuestionService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.questionService.listAll().subscribe((questions) => {
      this.questions = questions;
      this.currentQuestionIndex = 0;
    });

    // Obtenez l'ID de l'utilisateur actuel
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.id;
      }
    });
  }


  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  onSubmit() {
    if (this.userId !== null) {
      const responsesWithUserId = this.responses.map(response => ({
        ...response,
        userId: this.userId
      }));

      // Affiche les réponses dans la console
      console.log('Réponses soumises:', responsesWithUserId);
    } else {
      console.error('ID utilisateur non disponible');
    }
  }
}
