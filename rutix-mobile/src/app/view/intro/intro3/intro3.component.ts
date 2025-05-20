import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro3',
  templateUrl: './intro3.component.html',
  styleUrls: ['./intro3.component.scss']
})
export class Intro3Component {
  constructor(private router: Router) {}

  goToAuth() {
    this.router.navigate(['/login']);
  }

  goToPrevious() {
    this.router.navigate(['/intro2']);
  }
}