import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationTokenService } from 'src/core/http/services/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthenticationTokenService
  ) {}

  ngOnInit() {
    // Rediriger vers /home si l'utilisateur est déjà connecté
    if (this.authService.getUserToken()) {
      this.router.navigate(['/home']);
    }
  }

  goToIntro() {
    this.router.navigate(['/intro']);
  }
}
