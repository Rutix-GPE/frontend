import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/backend/question/question.service';
import { ResponseService } from 'src/backend/response/response.service'; 
import { AuthService } from 'src/backend/user/auth.service';
import { User } from 'src/backend/user/user.interface';
import { Question } from 'src/backend/question/question.interface';
import { Response } from 'src/backend/response/response.interface'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  questions: Question[] = [];
  userResponseslist: { [questionId: number]: Response | null } = {}; 
  currentUser: User | null = null;  
  showResponses = false;

  constructor(
    private questionService: QuestionService,
    private responseService: ResponseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.loadQuestions();  // Load questions regardless of user existence
      if(this.currentUser!= null){
        this.loadUserResponsesForUser(this.currentUser?.id)
        console.log("je suis passé par la ")
        console.log(this.userResponseslist)
      }
    });
  }

  loadQuestions(): void {
    this.questionService.listAll().subscribe(questions => {
      this.questions = questions;
    });
  }
  toggleDisplay(): void {
    this.showResponses = !this.showResponses;  // Basculer l'affichage des réponses
  }
   
  loadUserResponsesForUser(userId: number): void {
    this.responseService.getUserResponsesByUserId(userId).subscribe({
      next: (responses: Response[]) => {
        // Populate userResponses by mapping the responses to their questionId
        responses.forEach(response => {
          this.userResponseslist[response.questionId] = response;
          
        });
      },
      error: (error) => {
        console.error(`Error fetching responses for user ${userId}:`, error);
      }
    });
  }
}
