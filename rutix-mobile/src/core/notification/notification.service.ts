import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {}

  // Demande les permissions, indispensable sur Android 13+
  async requestPermissions(): Promise<void> {
    const { display } = await LocalNotifications.checkPermissions();
    if (display !== 'granted') {
      await LocalNotifications.requestPermissions();
    }
  }

  /**
   * Planifie une notification en précisant l'heure de déclenchement.
   */
  async scheduleNotificationAt(task: any, at: Date, notifId: number): Promise<void> {
    const options: ScheduleOptions = {
      notifications: [{
        id: notifId,
        title: notifId % 2 === 0 ? 'Rappel de tâche' : 'Tâche en cours',
        body: notifId % 2 === 0
          ? `Dans 30 minutes : ${task.name}`
          : `C'est le moment pour : ${task.name}`,
        schedule: { at, allowWhileIdle: true }
      }]
    };
    await LocalNotifications.schedule(options);
  }

  /**
   * Envoie une notification de test quasi-immédiate.
   */
  async sendTestNotification(): Promise<void> {
    // S'assurer d'avoir la permission
    await this.requestPermissions();

    // On planifie dans 1s pour garantir le dispatch
    const at = new Date(Date.now() + 1000);
    const options: ScheduleOptions = {
      notifications: [{
        id: Date.now() % 100000,           // ID unique
        title: '🔔 Notification de test',
        body: 'Ceci est une notification de test.',
        schedule: { at, allowWhileIdle: true }
      }]
    };

    await LocalNotifications.schedule(options);
  }
}
