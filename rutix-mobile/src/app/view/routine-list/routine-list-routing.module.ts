import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutineListComponent } from './routine-list.component';

const routes: Routes = [
  {
    path: '',
    component: RoutineListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutineListPageRoutingModule {}
