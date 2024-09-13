import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/backend/user/auth.service';
import { User } from 'src/backend/user/user.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
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
      console.log("je suis la 2")
      console.log(this.password)
      console.log(this.username)
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          console.log(response);
          console.log("je suis la 2")
          localStorage.setItem('token', response.token);
          this.fetchCurrentUser();
        },
        error: (error) => console.error(error)
      });
    } else {
      this.authService.register(this.formData).subscribe({
        next: (response) => {
          console.log(response);
          this.authService.login(this.formData.username, this.formData.password).subscribe({
            next: (response) => {
              localStorage.setItem('token', response.token);
              this.fetchCurrentUser();
              this.router.navigate(['/question'])
            },
            error: (error) => console.error(error)
          });
        },
        error: (error) => console.error(error)
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
