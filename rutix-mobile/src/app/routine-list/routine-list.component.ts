import { Component, OnInit } from '@angular/core';
import { RoutineService } from 'src/backend/routine/routine.service';

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.page.html',
  styleUrls: ['./routine-list.page.scss'],
})
export class RoutineListComponent implements OnInit {
  routines: any[] = [];
  daysMap: { [key: number]: string } = {
    1: 'Lundi',
    2: 'Mardi',
    3: 'Mercredi',
    4: 'Jeudi',
    5: 'Vendredi',
    6: 'Samedi',
    7: 'Dimanche'
  };

  constructor(private routineService: RoutineService) {}

  ngOnInit() {
    this.routineService.listRoutinesByUser().subscribe((data) => {
      this.routines = data;
    });
  }

  getDayNames(days: number[]): string {
    return days.map(day => this.daysMap[day]).join(', ');
  }
}
