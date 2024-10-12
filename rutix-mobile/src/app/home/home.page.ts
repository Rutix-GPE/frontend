import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/backend/question/question.service';
import { ResponseService } from 'src/backend/response/response.service'; 
import { AuthService } from 'src/backend/user/auth.service';
import { User } from 'src/backend/user/user.interface';
import { Question } from 'src/backend/question/question.interface';
import { Response } from 'src/backend/response/response.interface'; 
import { CategorieService, Category } from 'src/backend/categorie/categorie.service'; // Import CategoryService and Category interface
import { TaskService, Tasks }from 'src/backend/tasks/task.service';

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
  showTasks = false;
  categories: Category[] = []; // Array to store categories

  tasks: Tasks[] = [ 
    {name: "Tache 1", taskTime: '01:00'},
    {name: "Tache 2", taskTime: '04:00'},
    {name: "Tache 3", taskTime: '06:00'},
  ]


  constructor(
    private questionService: QuestionService,
    private responseService: ResponseService,
    private authService: AuthService,
    private categorieService: CategorieService,
    private taskService: TaskService
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

    this.updateClock();
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
  toggleDisplay(show: 'responses' | 'categories'| 'tasks') {
    if (show === 'responses') {
      this.showResponses = true;
      this.showCategories = false; // Cacher les catégories
      this.showTasks = false;// Cacher les taches
    } else if(show == 'categories') {
      this.showCategories = true;
      this.showResponses = false; // Cacher les réponses
      this.showTasks = false;// Cacher les taches
    } else if(show == 'tasks') {
      this.showTasks = true;
      this.showResponses = false;// Cacher les réponses
      this.showCategories = false;// Cacher les catégories
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
  
  updateClock() {
    const hourHand = document.querySelector('.hour-hand') as HTMLElement;
    const minuteHand = document.querySelector('.minute-hand') as HTMLElement;
    const secondHand = document.querySelector('.second-hand') as HTMLElement;

    function setClock() {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secondDegrees = ((seconds / 60) * 360) + 90;
      const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
      const hourDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

      secondHand.style.transform = `rotate(${secondDegrees}deg)`;
      minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
      hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    setInterval(setClock, 1000);
  }
}


