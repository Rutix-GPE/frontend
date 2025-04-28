// notification.service.ts
import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {}

  // Demande les permissions, indispensable sur Android 13+
  async requestPermissions(): Promise<void> {
    const permissions = await LocalNotifications.checkPermissions();
    if (permissions.display !== 'granted') {
      await LocalNotifications.requestPermissions();
    }
  }

  /**
   * Planifie une notification en précisant l'heure de déclenchement.
   * @param task La tâche concernée.
   * @param at La date à laquelle la notif doit s'activer.
   * @param notifId L'identifiant qu'on souhaite donner à la notification.
   */
  async scheduleNotificationAt(task: any, at: Date, notifId: number): Promise<void> {
    const options: ScheduleOptions = {
      notifications: [
        {
          id: notifId,
          title: notifId % 2 === 0 ? 'Rappel de tâche' : 'Tâche en cours',
          body: notifId % 2 === 0
            ? `Dans 30 minutes : ${task.name}`
            : `C'est le moment pour : ${task.name}`,
          schedule: { at, allowWhileIdle: true }
        }
      ]
    };
    await LocalNotifications.schedule(options);
  }
}
