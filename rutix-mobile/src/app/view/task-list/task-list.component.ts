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
      user: "",
      name: '',
      taskDateTime: new  Date().toISOString(),
      status: 'pending'
    };
    colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light'];
    tasks: Tasks[] = [];
    hours: string[] = [
      '8:00', '9:00', '10:00', '11:00', '12:00',
      '13:00', '14:00', '15:00', '16:00',
      '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
    ];
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
      user: "",
      name: '',
      taskDateTime: new  Date().toISOString(),
      status: 'pending'
    };
  }

  cancelTask() {
    this.newTask = {
      description: "",
      user: "",
      name: '',
      taskDateTime: new  Date().toISOString(),
      status: 'pending'
    };
    this.isAddingTask = false;
  }

  calculateTop(date: string | Date): string {
    const taskDate = new Date(date);
    const hour = taskDate.getHours() + (taskDate.getMinutes() / 60);
    const hourStart = 8;
    const pixelsPerHour = 100;
    const offset = (hour - hourStart) * pixelsPerHour;
    return `${offset}px`;
  }
}


