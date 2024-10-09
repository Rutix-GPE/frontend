import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/backend/user/auth.service';
import { User } from 'src/backend/user/user.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AuthComponent {
  isLoginMode = true;
  username = ''
  password = ''
  step = 1;
  formData: any = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    country: '',
    postalcode: '',
    city: '',
    adress: ''
  };
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser$.subscribe(user => this.currentUser = user);
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    if (!this.isLoginMode) {
      this.step = 1;
    }
  }

  nextStep() {
    if (this.step < 3) {
      this.step += 1;
    }
  }

  previousStep() {
    if (this.step > 1) {
      this.step -= 1;
    }
  }

  onSubmit() {
    if (this.isLoginMode) {
      if (!this.username || !this.password) {
        console.error('Missing information');
        return;
      }
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.fetchCurrentUser();
        },
        error: (error) => {
          if (error.status === 401) {
            console.error('Wrong password / username / email');
          } else if (error.status === 404) {
            console.error('User not found');
          } else {
            console.error('Problème réseau');
          }
        }
      });
    } else {
      this.authService.register(this.formData).subscribe({
        next: (response) => {
          console.log(response);
          this.authService.login(this.formData.username, this.formData.password).subscribe({
            next: (response) => {
              localStorage.setItem('token', response.token);
              this.fetchCurrentUser();
              this.router.navigate(['/question']);
            },
            error: (error) => {
              console.error('Problème réseau');
            }
          });
        },
        error: (error) => {
          console.error('Problème réseau');
        }
      });
    }
  }


  fetchCurrentUser() {
   /* this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.authService.setCurrentUser(user);
        console.log('Current User:', this.currentUser);
        this.router.navigate(['/home']);
      },
      error: (error) => console.error(error)
    });*/
    this.router.navigate(['/home']);
  }
}
