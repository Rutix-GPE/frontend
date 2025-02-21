import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/backend/question/question.service';
import { ResponseService } from 'src/backend/response/response.service';
import { AuthService } from 'src/backend/user/auth.service';
import { User } from 'src/backend/user/user.interface';
import { Question } from 'src/backend/question/question.interface';
import { Response } from 'src/backend/response/response.interface';
import { CategorieService, Category } from 'src/backend/categorie/categorie.service'; // Import CategoryService and Category interface
import { TaskService } from 'src/backend/tasks/task.service';
import { Tasks } from 'src/backend/tasks/task.interface';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

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
  postItMemo: string = '';
  isEditingMemo = false;
  isAddingTask = false;
  newTask: Tasks = {
    description: "",
    id: 0,
    taskDate: "",
    user: "",
    name: '',
    taskTime: new  Date().toISOString(),
    status: 'pending'
  };
  colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light'];
  tasks: Tasks[] = [];
  dateString: string = '';
  timeString: string = '';
  constructor(
    private questionService: QuestionService,
    private responseService: ResponseService,
    private authService: AuthService,
    private categorieService: CategorieService,
    private taskService: TaskService,
    private router: Router,
    private menu: MenuController,
  ) {}


  ngOnInit(): void {
    this.updateClock();
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.loadQuestions();
      if (this.currentUser != null) {
        this.loadUserResponsesForUser(this.currentUser?.id);
      }
    });

    const savedMemo = localStorage.getItem('postItMemo');
    if (savedMemo) {
      this.postItMemo = savedMemo;
    }
    this.loadTasks();
    this.loadMemo();

    const now = new Date();
    let dateFormatted = now.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
    dateFormatted = dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);
    const timeFormatted = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    this.dateString = dateFormatted;
    this.timeString = timeFormatted;
  }

  fetchCategories(): void {
    this.categorieService.listAll().subscribe(
      (data: Category[]) => {
        this.categories = data;
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

  toggleDisplay(show: 'responses' | 'categories' | 'tasks') {
    this.showResponses = show === 'responses';
    this.showCategories = show === 'categories';
    this.showTasks = show === 'tasks';
  }

  loadUserResponsesForUser(userId: number): void {
    this.responseService.getUserResponsesByUserId(userId).subscribe({
      next: (responses: Response[]) => {
        responses.forEach(response => {
          this.userResponseslist[response.questionId] = response;
        });
      },
      error: (error) => {
        console.error(`Error fetching responses for user ${userId}:`, error);
      }
    });
  }

  loadTasks(): void {
    this.taskService.getTasksByUserForToday().subscribe(tasks => {
      this.tasks = tasks.map(task => ({ ...task, isEditing: false }));
    });
  }

  toggleEditTask(task: Tasks): void {
    task.isEditing = true;
  }

  saveTask(task: Tasks): void {
    task.isEditing = false;
    if (task.id){
      this.taskService.updateTask(task.id, { name: task.name, taskTime: task.taskTime }).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  cancelEditTask(task: Tasks): void {
    task.isEditing = false;
    this.loadTasks();
  }

  addTaskCard() {
    this.isAddingTask = true;
  }

  saveTaskCard(name: string, taskTime: string): void {
    this.newTask = {
      description: "",
      taskDate: new Date().toISOString(),
      user: this.currentUser ? this.currentUser.id.toString() : "", // Assigner l'utilisateur actuel
      name: name,
      taskTime: taskTime,
      status: 'pending'
    };

    // Appel à addTask pour enregistrer la tâche via le service
    this.taskService.addTask(this.newTask).subscribe({
      next: (createdTask) => {
        // Ajout de la nouvelle tâche à la liste et fermeture de l'édition
        this.tasks.push({ ...createdTask, isEditing: false });
        this.isAddingTask = false; // Fermer le formulaire après ajout
      },
      error: (error) => {
        console.error('Erreur lors de la création de la tâche:', error);
      }
    });

    this.newTask = {
      description: "",
      id: 0,
      taskDate: "",
      user: "",
      name: '',
      taskTime: new  Date().toISOString(),
      status: 'pending'
    };
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


  cancelTask() {
    this.newTask = {
      description: "",
      taskDate: "",
      user: "",
      name: '',
      taskTime: new  Date().toISOString(),
      status: 'pending'
    };
    this.isAddingTask = false;
  }

  updateMemo() {
    this.isEditingMemo = true;
  }

  saveMemo() {
    localStorage.setItem('postItMemo', this.postItMemo);
    this.isEditingMemo = false;

  }

  loadMemo() {
    const savedMemo = localStorage.getItem('postItMemo');
    if (savedMemo) {
      this.postItMemo = savedMemo;
    }
  }

  openMenu() {
    this.menu.open('main-menu');
  }

  goToRoutine() {
    this.router.navigate(['/routine']);
    this.menu.close();
  }
}
