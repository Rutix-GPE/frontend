import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/backend/question/question.service';
import { ResponseService } from 'src/backend/response/response.service'; 
import { AuthService } from 'src/backend/user/auth.service';
import { User } from 'src/backend/user/user.interface';
import { Question } from 'src/backend/question/question.interface';
import { Response } from 'src/backend/response/response.interface';  // Importer l'interface UserResponse

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  questions: Question[] = [];
  userResponses: Response[] = [];  // Utiliser l'interface UserResponse
  currentUser: User | null = null;

  constructor(
    private questionService: QuestionService,
    private responseService: ResponseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.loadQuestions();
      }
    });
  }

  loadQuestions(): void {
    this.questionService.listAll().subscribe(questions => {
      this.questions = questions;
    });
  }

  loadUserResponses(): void {
    this.responseService.getUserResponses().subscribe(responses => {
      console.log("heyhey")
      this.userResponses = responses;
      console.log(responses)
      console.log(responses[0].questionId)

    });
  }

  getResponseByQuestionId(questionId: number){
    console.log(questionId + 'melissaaaa')
    console.log(this.responseService.getResponseByQuestionId(questionId))
    return this.responseService.getResponseByQuestionId(questionId);
  }

}
