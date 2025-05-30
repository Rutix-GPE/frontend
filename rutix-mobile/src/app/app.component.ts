import { Component, OnInit } from '@angular/core';
import { AuthComponent } from './view/auth/auth.component';
import { AuthService } from '../backend/user/auth.service';
import {NotificationSchedulerService} from "../core/notification/notification-scheduler.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private notifScheduler: NotificationSchedulerService) {
  }

  ngOnInit(): void {
    // Charger l'utilisateur dès que l'application démarre
    this.authService.loadCurrentUser();
    this.notifScheduler.initializeScheduler();
  }
}
