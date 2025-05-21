import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro2',
  templateUrl: './intro2.component.html',
  styleUrls: ['./intro2.component.scss']
})
export class Intro2Component {
  constructor(private router: Router) {}

  goToNext() {
    this.router.navigate(['/intro3']);
  }
}