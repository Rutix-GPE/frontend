import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro1',
  templateUrl: './intro1.component.html',
  styleUrls: ['./intro1.component.scss']
})
export class Intro1Component {
  constructor(private router: Router) {}

  goToNext() {
    this.router.navigate(['/intro2']);
  }
}