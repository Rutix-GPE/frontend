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
import {environment} from "../../../environments/environment";
import {NotificationService} from "../../../core/notification/notification.service";
import {UserService} from "../../../backend/user/user.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  questions: Question[] = [];
  protected baseApi = environment.backend_url;
  userResponseslist: { [questionId: number]: Response | null } = {};
  currentUser: User | null = null;
  showResponses = false;
  showCategories = false;
  showTasks = false;
  categories: Category[] = []; // Array to store categories
  postItMemo: string = '';
  isEditingMemo = false;
  isAddingTask = false;
  presentationMode = false;
  newTask: Tasks = {
    description: "",
    id: 0,
    taskDateTime: new  Date().toISOString(),
    user: "",
    name: '',
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
    private notificationService: NotificationService,
    private userService: UserService
  ) {}


  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      //this.loadQuestions();
      if (this.currentUser != null) {
       // this.loadUserResponsesForUser(this.currentUser?.id);
      }
    });
    this.presentationMode = this.userService.presentationMode;

    const savedMemo = localStorage.getItem('postItMemo');
    if (savedMemo) {
      this.postItMemo = savedMemo;
    }
    this.loadTasks();
    this.loadMemo();
    this.updateDateTime()
    setInterval(() => {
      this.updateDateTime()
    },1000)
  }

  notifyTask(task: Tasks): void {
    if (!this.presentationMode) { return; }
    this.notificationService.sendNotification(`Il est l'heure de ${task.name}`);
  }

  private updateDateTime(): void {
    const now = new Date();

    let dateFormatted = now.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
    dateFormatted = dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);

    const timeFormatted = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      //second: '2-digit'
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
      this.taskService.updateTask(task.id, { name: task.name, taskDateTime: task.taskDateTime }).subscribe(() => {
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
      user: this.currentUser ? this.currentUser.id.toString() : "", // Assigner l'utilisateur actuel
      name: name,
      taskDateTime: taskTime,
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
      taskDateTime: "",
      user: "",
      name: '',
      status: 'pending'
    };
  }

  cancelTask() {
    this.newTask = {
      description: "",
      taskDateTime: "",
      user: "",
      name: '',
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
