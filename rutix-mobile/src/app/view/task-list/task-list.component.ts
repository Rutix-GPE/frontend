import { Component, OnInit } from '@angular/core';
//import { RoutineService } from 'src/backend/routine/routine.service';
import { TaskService } from 'src/backend/tasks/task.service';
import { Tasks } from 'src/backend/tasks/task.interface';
import { User } from 'src/backend/user/user.interface';



@Component({
  selector: 'app-routine-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListComponent implements OnInit {
    currentUser: User | null = null;
    showTasks = false;
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
    private taskService: TaskService,) {}

  ngOnInit() {
    this.loadTasks();
    
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

    this.taskService.addTask(this.newTask).subscribe({
      next: (createdTask) => {
        this.tasks.push({ ...createdTask, isEditing: false });
        this.isAddingTask = false; 
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

}


