import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/backend/question/question.service';
import { ResponseService } from 'src/backend/response/response.service'; 
import { AuthService } from 'src/backend/user/auth.service';
import { User } from 'src/backend/user/user.interface';
import { Question } from 'src/backend/question/question.interface';
import { Response } from 'src/backend/response/response.interface'; 
import { CategorieService, Category } from 'src/backend/categorie/categorie.service'; // Import CategoryService and Category interface

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
  showCategories = false;
  categories: Category[] = []; // Array to store categories


  constructor(
    private questionService: QuestionService,
    private responseService: ResponseService,
    private authService: AuthService,
    private categorieService: CategorieService
    
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.fetchCategories(); // Fetch categories when the component is initialized
      this.loadQuestions();  // Load questions regardless of user existence
      if(this.currentUser!= null){
        this.loadUserResponsesForUser(this.currentUser?.id)
        console.log("je suis passé par la ")
        console.log(this.userResponseslist)
      }
    });
  }


  fetchCategories(): void {
    this.categorieService.listAll().subscribe(
      (data: Category[]) => {
        this.categories = data; // Bind the fetched categories to the categories array
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  loadQuestions(): void {
    this.questionService.listAll().subscribe(questions => {
      this.questions = questions;
    });
  }
  toggleDisplay(show: 'responses' | 'categories') {
    if (show === 'responses') {
      this.showResponses = true;
      this.showCategories = false; // Cacher les catégories
    } else {
      this.showCategories = true;
      this.showResponses = false; // Cacher les réponses
    }
  }
  toggleCategories(): void {
    this.showCategories = !this.showCategories;
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
