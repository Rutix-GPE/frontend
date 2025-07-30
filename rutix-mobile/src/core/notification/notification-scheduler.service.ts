// notification-scheduler.service.ts
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import {TaskService} from "../../backend/tasks/task.service";
import {Tasks} from "../../backend/tasks/task.interface";

@Injectable({
  providedIn: 'root'
})
export class NotificationSchedulerService {

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  private getEarlyNotifId(task: Tasks): number {
    return (task.id || 0) * 1000;
  }

  private getExactNotifId(task: Tasks): number {
    return (task.id || 0) * 1000 + 1;
  }

  /**
   * Initialise le scheduler qui va vérifier les notifications planifiées.
   * Appelé dès le démarrage de l'application.
   */
  async initializeScheduler(): Promise<void> {
    // Assurer que l'on a les permissions nécessaires
    await this.notificationService.requestPermissions();

    // Récupère les tâches de la journée
    this.taskService.getTasksByUserForToday().subscribe(async (tasks: Tasks[]) => {
      // Récupère les notifications planifiées
      const pending = await LocalNotifications.getPending();
      const pendingIds: number[] = pending.notifications.map(n => n.id);

      for (const task of tasks) {
        const earlyId = this.getEarlyNotifId(task);
        const exactId = this.getExactNotifId(task);

        const taskTime = new Date(task.taskDateTime);
        const earlyTime = new Date(taskTime.getTime() - 30 * 60000); // 30 minutes avant

        // Si la notif "30 min avant" n'est pas présente, la planifier
        if (!pendingIds.includes(earlyId)) {
          await this.notificationService.scheduleNotificationAt(task, earlyTime, earlyId);
        }
        // Si la notif "à l'instant" n'est pas présente, la planifier
        if (!pendingIds.includes(exactId)) {
          await this.notificationService.scheduleNotificationAt(task, taskTime, exactId);
        }
      }
    });
  }
}
