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
  userResponses: { [questionId: number]: Response | null } = {};  // Map of responses keyed by questionId
  currentUser: User | null = null;  // Initialize with null

  constructor(
    private questionService: QuestionService,
    private responseService: ResponseService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.loadQuestions();  // Load questions regardless of user existence
    });
  }

  loadQuestions(): void {
    this.questionService.listAll().subscribe(questions => {
      this.questions = questions;
      if (this.currentUser) {
        this.loadUserResponses();  // Fetch responses for the current user if they are logged in
      }
    });
  }

  loadUserResponses(): void {
    if (!this.currentUser) {
      console.warn('No user is logged in. Cannot load responses.');
      return;
    }

    this.questions.forEach(question => {
      if (this.currentUser) { // Check again within the loop
        this.responseService.getUserResponse(this.currentUser.id, question.id).subscribe({
          next: (response: Response) => {
            this.userResponses[question.id] = response;
          },
          error: (error) => {
            console.error(`Error fetching response for question ${question.id}:`, error);
            this.userResponses[question.id] = null;  // Assign null if error occurs
          }
        });
      }
    });
  }
}
