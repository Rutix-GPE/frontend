// avatar-selector.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AvatarService } from '../../../backend/avatar/avatar.service';
import { AuthService } from '../../../backend/user/auth.service';
import { User } from '../../../backend/user/user.interface';
import {environment} from "../../../environments/environment";

interface AvatarItem {
  filename: string;
  url: string;
}

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
  ) {}


  ngOnInit(): void {
    this.loading = true;
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.loading = false;
        return;
      }

      this.avatarService.list().subscribe({
        next: (urls: string[]) => {
          this.avatars = urls;
          // retrouver l’index sur le nom de fichier
          const idx = this.avatars.findIndex(url =>
            url.endsWith(user.avatarFile)
          );
          this.currentIndex = idx >= 0 ? idx : 0;
        },
        error: err => {
          console.error('Erreur chargement avatars', err);
        },
        complete: () => {
          this.loading = false;
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
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
    if (!filename) { return; }
    this.avatarService.updateAvatar(filename).subscribe({
      next: () =>
        this.authService.loadCurrentUser(),


      error: err =>
        console.error('Erreur mise à jour avatar', err),
    });
  }

  /*
  // notifications (à décommenter plus tard)
  onNotificationsToggle(event: CustomEvent) { … }
  */
}
