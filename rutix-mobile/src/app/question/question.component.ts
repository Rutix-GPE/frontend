import { Component, OnInit } from '@angular/core';
import { Question } from 'src/backend/question/question.interface';
import { QuestionService } from 'src/backend/question/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  responses!: {
    userID: number,
    questionId: number,
    response: string[]
  }[]

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.listAll().subscribe((questions) => {
      this.questions = questions;
      this.currentQuestionIndex = 0;
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
    console.log(this.responses)
  }
}
