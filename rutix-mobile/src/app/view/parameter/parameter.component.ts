// parameter.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AvatarService } from '../../../backend/avatar/avatar.service';
import { AuthService } from '../../../backend/user/auth.service';
import { User } from '../../../backend/user/user.interface';
import { environment } from '../../../environments/environment';
import {UserService} from "../../../backend/user/user.service";
import {NotificationService} from "../../../core/notification/notification.service";

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss'],
})
export class ParameterComponent implements OnInit, OnDestroy {
  protected baseApi = environment.backend_url;
  avatars: string[] = [];
  currentIndex = 0;
  loading = false;
  currentUser: User | null = null;
  private userSub!: Subscription;

  constructor(
    private authService: AuthService,
    private avatarService: AvatarService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.loading = false;
        return;
      }

      // plus d'initialisation notificationsEnabled ici

      this.avatarService.list().subscribe({
        next: (urls: string[]) => {
          this.avatars = urls;
          const idx = this.avatars.findIndex(url =>
            url.endsWith(user.avatarFile)
          );
          this.currentIndex = idx >= 0 ? idx : 0;
        },
        error: err => console.error('Erreur chargement avatars', err),
        complete: () => (this.loading = false),
      });
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  async testNotification() {
    try {
      await this.notificationService.sendTestNotification();
      console.log('Notification de test planifiée');
    } catch (err) {
      console.error('Échec notification de test', err);
    }
  }

  get currentAvatarUrl(): string {
    return this.avatars[this.currentIndex] || '';
  }

  prev() {
    if (!this.avatars.length) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.avatars.length) % this.avatars.length;
  }

  next() {
    if (!this.avatars.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.avatars.length;
  }

  save() {
    const filename = this.avatars[this.currentIndex];
    if (!filename) return;
    this.avatarService.updateAvatar(filename).subscribe({
      next: () => this.authService.loadCurrentUser(),
      error: err => console.error('Erreur mise à jour avatar', err),
    });
  }

  // getters/setters délégués au UserService
  get notificationsActive(): boolean {
    return this.userService.notificationsActive;
  }
  set notificationsActive(value: boolean) {
    this.userService.notificationsActive = value;
  }

  get presentationMode(): boolean {
    return this.userService.presentationMode;
  }
  set presentationMode(value: boolean) {
    this.userService.presentationMode = value;
  }

  // handlers pour les toggles
  onNotificationsToggle(event: CustomEvent) {
    this.notificationsActive = event.detail.checked;
  }

  onPresentationToggle(event: CustomEvent) {
    this.presentationMode = event.detail.checked;
  }
}
